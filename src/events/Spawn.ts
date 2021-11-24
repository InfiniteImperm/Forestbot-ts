import antiafk from '../util/antiAfk.js';
import viewer from '../util/viewer.js';
import embed from '../util/embed.js';
export default {
    name: 'spawn',
    once: true,
    async execute(bot:any, bot_options:any, database:any, querys:any) {  
        embed("Bot has logged into the server.", "#00FF00");      
        bot_options.afk ? antiafk(bot) : console.log("Anti afk disabled...");
        return viewer(bot, bot_options.viewerPort);
    }
}