export default async function playtime (bot:any,database:any,querys:any) { 
    Object.keys(bot.players).forEach((player) => {
        if (!player) return;
        database.query(querys.updatePlaytime, [player]);
        return true;
    });
};
