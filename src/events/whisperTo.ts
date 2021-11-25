import embed from "../util/embed.js";
export default {
    name: 'chat:whisperTo',
    once: false,
    async execute(content:any, bot:any, bot_options:any, database:any, querys:any) {    
        
        const user = content[0][0];
        const message = content[0][1];
        
        return embed(`${user} » ${message}`, `${bot_options.pink}`);

    }
}