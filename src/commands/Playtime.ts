import { RowDataPacketPlaytime } from "../../Types";

export default {
    commands: ['playtime', 'pt'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, message:string, args:any[], text:string, bot:any, database:any, querys:any) => {

        let d: number | string , 
            h: number | string , 
            m: number | string;

        const dhms = (time: number | string) => {

            if (typeof time === 'string') time = parseInt(time);

            (d = Math.floor(time / (1000 * 60 * 60 * 24))),
            (h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
            (m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
            return `${d} Days(s) ${h} hours ${m} minutes.`;
        };


        const queryPlaytime = (user:string) => {

            database.query(querys.searchPlaytime, [user], async (err:any, results:Array<RowDataPacketPlaytime>) => {

                if (err || !results.length) return bot.whisper(username,"Player was not found.");
                
                let formatTime:string = dhms(parseInt(results[0].playtime));

                if (user === username) return bot.whisper(username,`${formatTime}`);
                if (user !== username) return bot.chat(`[${user}]: ${formatTime}`);

            })

        };


        if (args.length <= 0) queryPlaytime(username);
        if (args.length === 1) queryPlaytime(args.toString());

        return;
    }
}