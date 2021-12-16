import { Client, Interaction} from 'discord.js';
import sleep from '../../util/sleep.js';
export default {
    name: 'interactionCreate',
    once: false,
    async execute(interaction: Interaction, client: Client) {
        if (!interaction.isButton()) return;
        const userID: string = interaction.member.user.id;
        const whiteList: string[] = ['741648653327925280', '703044116019281963'];
        if (!whiteList.includes(userID)) return interaction.deferUpdate();
        if (interaction.customId === `${process.env.DATABASE}`) {
            await interaction.update({ embeds: [{ color: '#5cb85c', description: "Attempting to restart..." }], components: [] });
            await sleep(1200);
            return process.exit(0);
        };
        return;
    }
};