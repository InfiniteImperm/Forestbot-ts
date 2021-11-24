import embed from '../util/embed.js';
export default {
    name: 'kicked',
    once: false,
    async execute(content:any) {
        return embed(`Kicked! Reason: ${content}`,'#ffa500');
    }
};