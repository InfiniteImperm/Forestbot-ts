import { RowDataPacketQuote } from "../../Types";

export default {
    commands: ['quote', 'q'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, message:string, args:any[], text:any, bot:any, database:any, querys:any) => {

        const queryQuote = (user:string) => {

            database.query(querys.quote, [user], async (err:any, results:Array<RowDataPacketQuote>) => {

                if (err || !results.length) return bot.whisper(username, `${user} has sent no messages, or their message was to short to be quoted.`);
                if (user === username) return bot.whisper(username,`${results[0].message}`);
                if (user !== username) return bot.chat(`[${user}]: ${results[0].message}`);

            })

        };


        if (args.length <= 0) queryQuote(username);
        if (args.length === 1) queryQuote(args.toString());

        return;
    }
}