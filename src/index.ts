'use strict';
import EventEmitter from 'events';
import Check from './Check.js';
import loadCommands from './functions/loadCommands.js';
import handleEvents from './functions/HandleEvents.js';
import tab from './util/tablist/tab.js';
import patterns from './util/patterns.js';
import connect from './database/createpool.js';
import playtime from './functions/TrackPlaytime.js';
import discordLogin from './Discord/login.js';
import loginMineflayer from './createbot.js';
import loadChannels from './util/loadChannels.js';
import advertise from './util/adverts.js';
import { Success, Fail } from './util/log.js';
import TPS from './tps/getTps.js';
import { Bot } from 'mineflayer';
import { Client } from 'discord.js';
import { readFile } from 'fs/promises';
import logTps from './tps/logTps.js';
import logPlayerCount from './tps/logPlayerCount.js';

export let array_tps: [number, number][] = [];
export let channels: string[] = [];
export let client: Client;
export let bot: Bot;

(async () => {
    let database: any = false;
    const bot_config_unparsed: any = await Check.bot_config()
    const bot_config = JSON.parse(bot_config_unparsed);
    const query_unparsed: any = await Check.querys();
    const querys = JSON.parse(query_unparsed);
    /**
     * Creating connection to database.
     */
    database = await connect(Check.database_options);
    if (!database) Fail("Connection to database has failed.");
    else Success("Created connection to database successfully.")
    /**
     * Logging in Discord Bot.
     */
    client = await discordLogin(Check.token) as Client;
    if (!client) Fail("Discord bot could not connect.");
    Success("Discord bot logged in successfully.");
    /**
     * Getting livechat channels
     */
    channels = await loadChannels.loadChannels(database)
    setInterval(async () => { channels = await loadChannels.loadChannels(database) }, bot_config.channelRefreshTime);
    /**
     * Logging in Minecraft bot.
     */
    bot = await loginMineflayer(Check.bot_options as any, client, bot_config.RelayChannel) as Bot;
    Success("Mineflayer bot logged in successfully.")

    try {
        /**
         * Loading TPS Plugin.
         */
        bot.loadPlugin(TPS);
        /**
        * Loading patterns. 
        */
        patterns(bot);
        /**
        * Registering events
        */
        handleEvents(bot_config, bot, querys, database);
        /**
        * Registering commands.
        */
        loadCommands(database, querys, bot);

        Success("Patterns, events, commands loaded successfully.");
    } catch {
        return Fail("Failed to load patterns || handleEvents || loadCommands");
    };

    /**
     * If database connection is successful
     * we will create a tablist, and log players playtime.
     */
    if (database) {
        tab(bot, database, querys);
        setInterval(async () => { playtime(bot, database, querys) }, 60000);

        if (bot_config.logTps) {
            /**
            * Logging Tps usage ever 5 minutes.
            */
            setInterval(async () => { logTps(database, bot) }, 5 * 60000);
            /**
             * Logging player count every 25 minutes.
             */
            setInterval(async () => { logPlayerCount(database, bot) }, 25 * 60000);
        }
    };

    /**
     * Bot will send random message
     * every x minutes.
     */
    if (bot_config.ads) {
        const Adverts: Buffer = await readFile('adverts.txt');
        setInterval(async () => { bot.chat(advertise(Adverts)) }, bot_config.adTime * 60000);
    };

})();
EventEmitter.defaultMaxListeners = 25;