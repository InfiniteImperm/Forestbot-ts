import sleep from '../util/sleep.js';
import embed from '../util/embed.js';
export default {
    name: 'end',
    once: true,
    async execute(content:any, bot:any, bot_options:any) {
        embed(`**Attempting to rejoin in 15 seconds...**`,'#ffa500');
        await sleep(bot_options.reconnectTime);
        return process.exit();
    }
};