import Check from './Check.js';
import startBot from './createbot.js';
import { readdir } from 'fs/promises';
import loadCommands from './functions/loadCommands.js';
import handleEvents from './functions/HandleEvents.js';
import tab from './util/tablist/tab.js';
import patterns from './util/patterns.js';
import connect from './database/createpool.js';
import { Client, Intents } from 'discord.js';
import playtime from './functions/TrackPlaytime.js';


const Success = (text:string) => console.log('\x1b[32m%s\x1b[0m',`${text}`);
const Fail = (text:string) => console.log('\x1b[31m%s\x1b[0m', `${text}`);

let bot:any;
let database:any = false;

export let channels:string[] = [];
export const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

function loadChannels() {
    if(!database) return;
    database.query(`SELECT * FROM livechats`, (err:any, res:any) => {
        if (err) return Fail("Error loading livechat channels."), console.error(err);
        channels = [];
        res.forEach((element:any) => {
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
        const querys:any = env_options.querys;


        /**
         * Creating connection the database.
         */
        if (env_options.USE_DATABASE) {
            database = await connect(env_options.DATABASE_HOST, env_options.DATABASE_USER, env_options.DATABASE_PASS, env_options.DATABASE);
            if (database) Success("Connected to database successfully.");
            if (!database) Fail("Database connection was NOT successful.");
        };


        /**
         * Logging in Discord Bot.
         */
        if (env_options.USE_DISCORD) {
            client.login(env_options.DISCORD_TOKEN);
            
            client.once("ready", () => {
                Success("Discord bot successfully logged in.");
                loadChannels();
                setInterval(() => { loadChannels() }, bot_config.channelRefreshTime)
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

            bot = await startBot(env_options.MC_HOST , env_options.MC_USER, env_options.MC_PASS, env_options.MC_VERSION, parseInt(env_options.MC_PORT));

            /**
             * Loading custom chat patterns. and tablist.
             */

            patterns(bot);

            if (database) {
                tab(bot,database,querys);
                setInterval(() => { playtime(bot,database,querys) }, 60000);
            };


            /**
             * Handling Mineflayer Events.
             */
            const eventDir = (await readdir('./dist/events')).filter(file=>file.endsWith('.js'));
            handleEvents(bot, eventDir, bot_config, database, querys);
            

            /**
             * Loading commands.
             */
            await loadCommands(bot, database, querys);

        };

    }

    catch (error) {

        throw new Error(error);

    };


})();