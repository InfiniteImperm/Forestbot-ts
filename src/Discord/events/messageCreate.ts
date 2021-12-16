import { Message, Client } from 'discord.js';
import { channels, bot } from '../../index.js';
export default {
    name: 'messageCreate',
    once: false,
    async execute(message: Message, client: Client) {
        const { content, author, channel, member } = message;
        if (!channels || channels.length < 1 || content.includes('\n') || author.id === client.user.id || !bot) return;
        channels.forEach(Channel => {
            if (channel.id !== Channel) return;
            bot.chat(`${member.user.tag} » ${content}`);
        });
        return;
    }
};