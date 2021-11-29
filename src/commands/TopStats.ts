import { promisify } from "util";

export default { 
    commands: ['top'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "Kills | Deaths | Playtime | Joins | Leaves",
    callback: async (username: string, message: string, args: string[], text: string, bot: any, database: any, querys: any)  => {

        const promisedQuery = promisify(database.query).bind(database);

        const _args:string = args[0].toLowerCase();

        switch (_args) {

            case 'kills':
                const Kills: string[]|number[] = await promisedQuery(querys.topKills);
                const stringKills: string = Kills.map((element: any) => `${element.username}: ${element.kills}`).join(", ");
                bot.chat(`[TOP KILLS]: ${stringKills}`);
                break;

            case 'deaths':   
                const Deaths: string[]|number[] = await promisedQuery(querys.topDeaths);
                const stringDeaths: string = Deaths.map((element: any) => `${element.username}: ${element.deaths}`).join(", ");
                bot.chat(`[TOP DEATHS]: ${stringDeaths}`);
                break;

            case 'joins':
                const Joins: string[]|number[] = await promisedQuery(querys.topJoins);
                const stringJoins: string = Joins.map((element: any) => `${element.username}: ${element.joins}`).join(", ");
                bot.chat(`[TOP JOINS/LEAVES]: ${stringJoins}`);
                break;

            case 'leaves':
                const Leaves: string[]|number[] = await promisedQuery(querys.topJoins);
                const stringLeaves: string = Leaves.map((element: any) => `${element.username}: ${element.joins}`).join(", ");
                bot.chat(`[TOP JOINS/LEAVES]: ${stringLeaves}`);
                break;
    
            case 'playtime':            
                const Playtime: string[]|number[] = await promisedQuery(querys.playtimeTop);
                const stringPlaytime: string = Playtime.map((element: any) => `${element.username}: ${Math.floor(element.playtime / (1000 * 60 * 60 * 24))} Days`).join(", ");
                bot.chat(`[TOP PLAYTIME]: ${stringPlaytime}`);
                break;
            
            default: 
                return bot.whisper(username, "Can't find top stats for " + _args);

        }

        return;

    }
}