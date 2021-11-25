import sleep from '../util/sleep.js';
import embed from '../util/embed.js';
export default {
    name: 'end',
    once: false,
    async execute(bot:any, bot_options:any, database:any, querys:any) {
        embed(`**Attempting to rejoin in 15 seconds...**`,`${bot_options.orange}`);
        await sleep(bot_options.reconnectTime);
        return process.exit();
    }
};