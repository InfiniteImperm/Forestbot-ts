import embed from '../util/embed.js';
export default {
    name: 'kicked',
    once: false,
    async execute(content:any, SecondArg:any, bot:any, bot_options:any, database:any, querys:any) {
        return embed(`Kicked! Reason: ${content}`,`orange`);
    }
};