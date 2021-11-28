import { RowDataPacketLiveChat } from '../Types';
import { Client, Intents } from 'discord.js';
import { readdir } from 'fs/promises';
import EventEmitter from 'events';
import Check from './Check.js';
import startBot from './createbot.js';
import loadCommands from './functions/loadCommands.js';
import handleEvents from './functions/HandleEvents.js';
import tab from './util/tablist/tab.js';
import patterns from './util/patterns.js';
import connect from './database/createpool.js';
import playtime from './functions/TrackPlaytime.js';

export let bot: any;
export let database:any = false;
export let querys:any;

export const Info = (text: string) => console.log('\x1b[34m%s\x1b[0m',`${text}`);
export const Success = (text: string) => console.log('\x1b[32m%s\x1b[0m',`${text}`);
export const Fail = (text: string) => console.error('\x1b[31m%s\x1b[0m', `${text}`);
export let channels: string[] = [];
export const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

function loadChannels() {
    if(!database) return;
    database.query(`SELECT * FROM livechats`, (err: unknown, res: Array<RowDataPacketLiveChat>) => {
        if (err) return Fail("Error loading livechat channels."), console.error(err);
        channels = [];
        res.forEach((element) => {
            channels.indexOf(element.channelID) === -1 || null 
                    ? channels.push(element.channelID)
                    : 0;
            
        });
    })
    return;
};

(async () => {
    try {

        /**
         * Checking to make sure the right 
         * config options are present.
         * also getting our main options.
         */
        const env_options:any = await Check();
        if (env_options) Success("Checks where a success.");
        
        const bot_config:any = env_options.bot_config;
        querys = env_options.querys;

        /**
         * Creating connection the database.
         */
        if (env_options.USE_DATABASE) {
            
            database = await connect(env_options.DATABASE_HOST,
                                     env_options.DATABASE_USER,
                                     env_options.DATABASE_PASS,
                                     env_options.DATABASE);

            if (database) Success("Connected to database successfully.");
            if (!database) Fail("Database connection was NOT successful.");
        };

        /**
         * Logging in Discord Bot.
         * and handling some discord events.
         */
        if (env_options.USE_DISCORD) {
            client.login(env_options.DISCORD_TOKEN);
            
            client.once("ready", () => {
                
                Success("Discord bot successfully logged in.");
                loadChannels();
                setInterval(() => { loadChannels() }, bot_config.channelRefreshTime);

            });

            client.on("messageCreate", (message:any) => {

                const { content, channel, author, member } = message;
                if (author.id === client.user.id) return;
                
                try {

                    if (!channels || channels.length <= 0 || !database) return;
                    if (content.includes('\n')) return message.reply("Your message is too long.");
                    channels.forEach((Channel:any) => {
                        if (channel.id !== Channel || !bot) return;
                        bot.chat(`${member.user.tag} » ${content}`);
                    });

                }

                catch(error) {
                    return console.error(error);
                }

            });

        };

        /**
         * Logging in the Mineflayer Bot.
         */
        if (env_options.USE_MINEFLAYER) {

            bot = await startBot(env_options.MC_HOST,
                                 env_options.MC_USER, 
                                 env_options.MC_PASS, 
                                 env_options.MC_VERSION, 
                                 parseInt(env_options.MC_PORT));

            /**
             * Loading custom chat patterns. and tablist.
             */
            patterns(bot);

            /**
             * Loading tablist creator and playtime counter.
             * if database connection was a success.
             */
            if (database) {
                tab(bot,database,querys);
                setInterval(() => { playtime(bot) }, 60000);
            };

            /**
             * Handling Mineflayer Events.
             */
            const eventDir:string[] = (await readdir('./dist/events')).filter(file=>file.endsWith('.js'));

            await handleEvents(bot, 
                               eventDir, 
                               bot_config, 
                               database, 
                               querys);
            
            Success("Events active.");

            /**
             * Loading commands.
             */
            await loadCommands();
            Success("Commands loaded.");

        };

    }

    catch (error) {

        throw new Error(error);

    };
    
})();




/**
 * Because of the way 
 * our command handle is 
 * setup it will create
 * a new bot.on('chat')
 * event for each command.
 * so by doing this we increase
 * the max event listener limit.
 */
EventEmitter.defaultMaxListeners = 25;