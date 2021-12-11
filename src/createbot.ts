import mineflayer from 'mineflayer';
import { Fail } from './util/log.js';
import embed from './util/embed.js';

const serverIsOffline = (host: string, client: any, relayChannel: string) => {
    embed(`The server **${host}** seems to be offline 🤔.`, 'orange')


    client.channels.cache
        .get(relayChannel)
        .send({
            embeds: [{
                color: "#ffa500",
                description: "Should I attempt to reconnect ?"
            }], components: [{
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 2,
                        label: "Reconnect",
                        custom_id: "Reconnect"
                    },
                    {
                        type: 2,
                        style: 2,
                        label: "Reconnect in 15 minutes",
                        custom_id: "ReconnectInTime"
                    }
                ]
            }]
        });
}


const loginMineflayer = (options: mineflayer.BotOptions, client: any, Channel: string) => {
    return new Promise(resolve => {

        const bot: mineflayer.Bot = mineflayer.createBot(options);


        const timeOut: ReturnType<typeof setTimeout> = setTimeout(async () => {

            Fail('Mineflayer bot could not connect... going to idle.');
            serverIsOffline(options.host, client, Channel);

        }, 20000);

        bot.once("login", () => {
            embed(`Joined ${options.host} successfully!`, "green")
            clearTimeout(timeOut);
            resolve(bot);
        });


    });
};

export default loginMineflayer;