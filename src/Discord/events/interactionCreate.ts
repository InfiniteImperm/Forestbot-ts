import { Client, Interaction} from 'discord.js';
import sleep from '../../util/sleep.js';
export default {
    name: 'interactionCreate',
    once: false,
    async execute(interaction: Interaction, client: Client) {
        if (!interaction.isButton()) return;

        const userID: string = interaction.member.user.id;
        const whiteList: string[] = ['741648653327925280', '703044116019281963'];

        /**
         * If the user does not have access to use the buttons.
         */
        if (!whiteList.includes(userID)) return interaction.deferUpdate();

        if (interaction.customId === 'Reconnect') {
            await interaction.update({ embeds: [{ color: '#5cb85c', description: "Attempting to restart..." }], components: [] });
            await sleep(1200);
            return process.exit(0);
        };

        if (interaction.customId === 'ReconnectInTime') {

            /**
             * End process in 15 minutes,
             * let pm2 restart the process.
             */
            await interaction.update({ embeds: [{ color: '#5cb85c', description: "Attempting to rejoin in 15 minutes." }], components: [] });
            return setTimeout(() => { process.exit(0) }, 15 * 60000);
        }
    }
};