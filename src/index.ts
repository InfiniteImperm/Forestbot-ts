
import EventEmitter from 'events';
import Check from './Check.js';
import loadCommands from './functions/loadCommands.js';
import handleEvents from './functions/HandleEvents.js';
import tab from './util/tablist/tab.js';
import patterns from './util/patterns.js';
import connect from './database/createpool.js';
import playtime from './functions/TrackPlaytime.js';
import loadChannels from './util/loadChannels.js';
import { Success, Fail } from './util/log.js';
import discordLogin from './Discord/login.js';
import loginMineflayer from './createbot.js';
import { Bot } from 'mineflayer';
import { Client } from 'discord.js';

let bot:Bot;

export let channels: string[] = [];
export let client:Client;

(async () => {
    const bot_config_unparsed: any = await Check.bot_config()
    const bot_config = JSON.parse(bot_config_unparsed);

    const query_unparsed: any = await Check.querys();
    const querys = JSON.parse(query_unparsed);
    
    /**
     * Creating connection to database.
     */
    const database = await connect(Check.database_options);
    if (!database) return Fail("Connection to database has failed.");
    Success("Created connection to database successfully.")

    /**
     * Logging in Discord Bot.
     */
    client = await discordLogin(Check.token) as Client;
    if (!client) return Fail("Discord bot could not connect.");
    Success("Discord bot logged in successfully.");


    channels = await loadChannels.loadChannels(database)
    setInterval(async () => { channels = await loadChannels.loadChannels(database) }, bot_config.channelRefreshTime);
    
    /**
     * Logging in Minecraft bot.
     */
    bot = await loginMineflayer(Check.bot_options as any, client, bot_config.RelayChannel) as Bot;
    if (!bot) return Fail("Mineflayer bot did not login.");
    Success("Mineflayer bot logged in successfully.")

    try {
        /**
        * Loading patterns. 
        */
        patterns(bot);
        /**
        * Loading events
        */
        handleEvents(bot_config, bot, querys, database);
        /**
        * Loading commands.
        */
        loadCommands(database, querys, bot);
        Success("Patterns, events, commands loaded successfully.");
    }

    catch {
        return Fail("Failed to load patterns || handleEvents || loadCommands");
    };


    if (database) {
        tab(bot, database, querys);
        setInterval(() => { playtime(bot, database, querys) }, 60000);
    }

})();

EventEmitter.defaultMaxListeners = 25;