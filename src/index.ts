
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







// (async () => {
//     try {

//         /**
//          * Checking to make sure the right 
//          * config options are present.
//          * also getting our main options.
//          */
//         const _env: any = await Check();
//         if (_env) Success("Checks where a success.");

//         const bot_config: any = _env.bot_config;
//         querys = _env.querys;

//         /**
//          * Creating connection the database.
//          */
//         if (_env.USE_DATABASE) {

//             database = await connect(
//                 _env.DATABASE_HOST,
//                 _env.DATABASE_USER,
//                 _env.DATABASE_PASS,
//                 _env.DATABASE
//             );

//             if (database) Success("Connected to database successfully.");
//             if (!database) Fail("Database connection was NOT successful.");
//         };

//         /**
//          * Logging in Discord Bot.
//          * and handling some discord events.
//          */
//         if (_env.USE_DISCORD) {
//             client.login(_env.DISCORD_TOKEN);

//             client.once("ready", async () => {
                
//                 Success("Discord bot successfully logged in.");

//                 channels = await loadChannels.loadChannels(database)
        
//                 setInterval(async () => { channels = await loadChannels.loadChannels(database), console.log(channels) }, bot_config.channelRefreshTime);

//             });

            
//             client.on("messageCreate", (message:any) => {

//                 const { content, channel, author, member } = message;
//                 if (author.id === client.user.id) return;

//                 try {

//                     if (!channels || channels.length <= 0 || !database) return;
//                     if (content.includes('\n')) return;
//                     channels.forEach((Channel: string) => {
//                         if (channel.id !== Channel || !bot) return;
//                         bot.chat(`${member.user.tag} » ${content}`);
//                     });

//                 }

//                 catch (error) {
//                     return console.error(error);
//                 }

//             });

//         };

//         /**
//          * Logging in the Mineflayer Bot.
//          */
//         if (!_env.USE_MINEFLAYER) return;


//         bot = await startBot(
//             _env.MC_HOST,
//             _env.MC_USER,
//             _env.MC_PASS,
//             _env.MC_VERSION,
//             parseInt(_env.MC_PORT),
//             _env.bot_config.RelayChannel
//         );

//         /**
//          * Loading custom chat patterns. and tablist.
//          */
//         patterns(bot);

//         /**
//          * Loading tablist creator and playtime counter.
//          * if database connection was a success.
//          */
//         if (database) {
//             tab(bot, database, querys);
//             setInterval(() => { playtime(bot) }, 60000);
//         };

//         /**
//          * Handling Mineflayer Events.
//          */
//         const eventDir: string[] = (await readdir('./dist/events')).filter(file => file.endsWith('.js'));

//         await handleEvents(bot,
//             eventDir,
//             bot_config,
//             database,
//             querys);

//         Success("Events active.");

//         /**
//          * Loading commands.
//          */
//         await loadCommands();
//         Success("Commands loaded.");



//     }

//     catch (error) {

//         throw new Error(error);

//     };

// })();




// /**
//  * Because of the way 
//  * our command handle is 
//  * setup it will create
//  * a new bot.on('chat')
//  * event for each command.
//  * so by doing this we increase
//  * the max event listener limit.
//  */
// EventEmitter.defaultMaxListeners = 25;