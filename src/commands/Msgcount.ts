import { RowDataPacketMsgcount } from "../../Types";

export default {
    commands: ['msgcount', 'msgs'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, args:string[], text:string, bot:any, database:any, querys:any) => {

        const queryMessageCount = (user:string) => {
            database.query(querys.msgCount, [user], async (err:any, results:Array<RowDataPacketMsgcount>) => {

                if (err || !results.length) return bot.whisper(username, `No messages saved for user: ${user}`);
                if (user === username) return bot.whisper(username, `You have sent ${results[0].cnt} messages.`);
                if (user !== username) return bot.chat(`[${user}] has sent ${results[0].cnt} messages`);
            })

        };

        if (args.length <= 0) queryMessageCount(username);
        if (args.length === 1) queryMessageCount(args.toString());


        return;
    }
}