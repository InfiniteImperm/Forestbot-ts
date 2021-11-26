import { database, querys } from '../index.js';
export default async function playtime (bot:any) { 
    Object.keys(bot.players).forEach((player) => {
        if (!player) return;
        database.query(querys.updatePlaytime, [player]);
        return true;
    });
};
