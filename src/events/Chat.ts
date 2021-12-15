import embed from '../util/embed.js';
import { monthYear } from '../util/time.js';
export default {
    name: 'chat:chat',
    once: false,
    async execute(content:any, bot:any, bot_options:any, database:any, querys:any) {
        const username = content[0][0];
        const message = content[0][1]; 
        embed(`**${username}** » ${message}`, 'grey');
        if (!database) return;
        database.query(querys.saveMessage, [username, message, monthYear()]);
        return;
    }
}