import MojangAPI from 'mojang-api';
export default { 
    commands: ['oldnames'],
    minArgs:1,
    maxArgs:1,
    callback: (username:string, args:string[], text:string, bot:any, database:any, querys:any) => {
        MojangAPI.nameToUuid(args.toString(), (err:unknown, res: any[]) => {
            if (err || !res[0]) return bot.whisper(username, "User not found.");
            MojangAPI.nameHistory(res[0].id, (err:unknown, res:any[]) => {
                if (err) return console.error(err);
                if (!res[1]) return bot.whisper(username, "This user has never changed their name.");
                const mapped = res.map((element:any) => `${element.name}`).join(", ");
                return bot.chat(`Oldnames for [${args.toString()}]: ${mapped}`);

            });
        });
        return;
    }
}