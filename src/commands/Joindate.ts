import { RowDataPacketJoindate } from "../../Types";

export default {
    commands: ['joindate', 'jd', 'firstseen'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username: string, args: string[], text: string, bot: any, database: any, querys: any) => {
        const queryJoindate = (user: string) => {
            database.query(querys.searchJoindate, [user], async (err: any, results: Array<RowDataPacketJoindate>) => {
                if (err || !results.length) return bot.whisper(username, `Could not find ${user}'s joindate.'`);
                if (results[0].joindate === 'Not Recorded' || results[0].joindate === null || results[0].joindate === 'null') return bot.whisper(username, "I don't have this players joindate recorded.")
                if (user === username) return bot.whisper(username, `First time I seen you was ${results[0].joindate}`);
                if (user !== username) return bot.chat(`I first seen [${user}] on ${results[0].joindate}`);
            })
        }
        if (args.length <= 0) queryJoindate(username);
        if (args.length === 1) queryJoindate(args.toString());
        return;
    }
}