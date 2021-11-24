import { dateTime } from '../util/time.js';
import embed from '../util/embed.js';
export default { 
    name: 'playerLeft',
    once: false,
    async execute(player:any, bot:any, bot_options:any, database:any, querys:any) {

            embed(`**${player.username} left the server.**`,'#d9534f');

            if (!database) return;
            database.query(querys.updateLeaves, [dateTime(), player.username]);

            return;
    }
};