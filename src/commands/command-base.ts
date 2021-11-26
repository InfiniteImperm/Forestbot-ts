import { bot , database , querys } from '../index.js'; 
export default function _RegisterCommands(commandModules:any) {

    let {
        commands,
        minArgs = 0,
        maxArgs = null,
        expectedArgs,
        callback
    } = commandModules.default;

    if (typeof commands === 'string') commands = [commands];

    const prefix:string = "!";
    const cooldown = new Set();

    bot.on("chat:chat", async (content:string[]) => {

        const username:string = content[0][0];
        const message:string  = content[0][1];
        
        for (const alias of commands) {

            if (message.toLowerCase().startsWith(`${prefix}${alias}`)) {

                if (!database) return bot.whisper(username, "My database is offline! Please contact Febzey#1854 on Discord to get me fixed!");

                if (cooldown.has(bot.username)) return bot.whisper(username, "[Anti-Spam] Please wait 3 seconds.");
                cooldown.add(bot.username);
                setTimeout(()=>{cooldown.delete(bot.username)}, 3400);

                const args = message.split(/[ ]+/);
                args.shift();

                if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {

                    if (!expectedArgs) return bot.whisper(username, "Bad Syntax.");

                    return bot.whisper(username, `Improper usage. use: ${prefix}${alias} ${expectedArgs}`);

                };


                return callback(username, message, args, args.join(' '), bot, database, querys);

            }

        }


    });


    return;
};