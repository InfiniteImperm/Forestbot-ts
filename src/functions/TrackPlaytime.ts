export default async function playtime (bot:any, database: any, querys: any) {
    if (!bot.players || !bot) return; 
    Object.keys(bot.players).forEach((player) => {
        database.query(querys.updatePlaytime, [player]);
        return true;
    });
};
