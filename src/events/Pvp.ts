export default {
    name: 'chat:pvp',
    once: false,
    async execute(content:any, bot:any, bot_options:any, database:any, querys:any) {
        
        const victim = content[0][0];
        const murderer = content[0][1];

        if (!database) return;
        database.query(querys.updateKills, [murderer]);
        database.query(querys.updateDeaths, [victim]);

        return;

    }
}