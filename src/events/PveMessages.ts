import embed from "../util/embed.js";
export default {
    name: 'chat:pveMessages',
    once: false,
    async execute(content:any, bot:any, bot_options:any, database:any, querys:any) {        
        return embed(`${content.toString()}`, '#800080');
    }
}