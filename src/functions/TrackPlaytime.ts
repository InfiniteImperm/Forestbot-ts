import { database, querys } from '../index.js';
export default async function playtime (bot:any) {
    if (!bot.players || !bot) return; 
    Object.keys(bot.players).forEach((player) => {
        database.query(querys.updatePlaytime, [player]);
        return true;
    });
};
