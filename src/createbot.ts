import { createBot, Bot, BotOptions} from 'mineflayer';
import { Fail } from './util/log.js';
import embed from './util/embed.js';

const loginMineflayer = (options: BotOptions, client: any, Channel: string) => {
    return new Promise(resolve => {

        const bot: Bot = createBot(options);

        const timeOut: ReturnType<typeof setTimeout> = setTimeout(async () => {

            Fail('Mineflayer bot could not connect... going to idle.');
            embed(`The server **${options.host}** seems to be offline 🤔.`, 'orange')
            client.channels.cache
            .get(Channel)
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



        }, 40000);

        bot.once("login", () => {
            embed(`Joined ${options.host} successfully!`, "green")
            clearTimeout(timeOut);
            resolve(bot);
        });


    });
};

export default loginMineflayer;