import { RowDataPacketLastseen } from "../../Types";

export default {
    commands: ['lastseen', 'ls', 'lastsaw', 'seen'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, message:string, args:any[], text:string, bot:any, database:any, querys:any) => {

        const queryLastseen = (user:string) => {

            database.query(querys.lastSeen, [user], async (err:any, results:Array<RowDataPacketLastseen>) => {

                if (err || !results.length) return bot.whisper(username, `Player not found.`);
                if (user === username) return bot.whisper(username,`Last time I seen you was ${results[0].lastseen}`);
                if (user !== username) return bot.chat(`I last seen [${user}] on ${results[0].lastseen}`);

            })

        }; 


        if (args.length <= 0) queryLastseen(username);
        if (args.length === 1) queryLastseen(args.toString());

        return;
    }
}