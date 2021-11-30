import { RowDataPacketKills } from "../../Types";

export default {
    commands: ['kd','kills','deaths'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, args:string[], text:string, bot:any, database:any, querys:any) => {

        const queryKD = (user:string) => {

            database.query(querys.searchKills, [user], async (err:any, results:Array<RowDataPacketKills>) => {

                if (err || !results.length) return bot.whisper(username, `Player not found.`);
                if (user === username) return bot.whisper(username, `kills: ${results[0].kills} , Deaths: ${results[0].deaths}`);
                if (user !== username) return bot.chat(`[${user}] kills: ${results[0].kills} , Deaths: ${results[0].deaths}`);

            })

        }


        if (args.length <= 0) queryKD(username);
        if (args.length === 1) queryKD(args.toString());

        return;
    }
}