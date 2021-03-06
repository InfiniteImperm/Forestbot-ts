import antiafk from '../util/antiAfk.js';
import viewer from '../util/viewer.js';
import embed from '../util/embed.js';
import { Fail, Info } from '../util/log.js';

export default {
    name: 'spawn',
    once: true,
    async execute(bot:any, bot_options:any) {  
        embed("Bot has spawned into the server.", `green`);      
        bot_options.afk ? antiafk(bot) : Info("Anti afk disabled...");
        return viewer(bot, bot_options.viewerPort);
    }
};