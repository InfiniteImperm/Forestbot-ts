import sleep from '../util/sleep.js';
import embed from '../util/embed.js';
import { dhms } from '../util/time.js';
export default {
    name: 'end',
    once: false,
    async execute(bot: unknown, bot_options: any) {
        const uptime = Math.round(process.uptime() * 1000);
        embed(`Bot has been running for: ${dhms(uptime)}`, `orange`)
        embed(`**Attempting to rejoin in 15 seconds...**`, `orange`);
        await sleep(bot_options.reconnectTime);
        return process.exit();
    }
};