export default {
    name: 'chat:pve',
    once: false,
    async execute(content:any, bot:any, bot_options:any, database:any, querys:any) {
        
        let victim = content[0][0];

        if (!database) return;
        database.query(querys.updateDeaths, [victim]);

        return;
    }
}