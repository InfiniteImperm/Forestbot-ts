import { createBot, Bot, BotOptions} from 'mineflayer';
import { Fail } from './util/log.js';
import embed from './util/embed.js';

const loginMineflayer = (options: BotOptions, client: any, Channel: string) => {
    return new Promise(resolve => {
        
        embed(`Attempting to join ${options.host}`, 'green')

        const bot: Bot = createBot(options);

        const timeOut: ReturnType<typeof setTimeout> = setTimeout(async () => {

            Fail('Mineflayer bot could not connect... going to idle.');
            embed(`The server **${options.host}** seems to be offline 🤔.`, 'orange');
            
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
                            /**
                             * Setting the custom_id to the same
                             * name as database, just so we can have
                             * a unique id for each bot, since the database
                             * names are unique for each bot as well.
                             */
                            custom_id: `${process.env.DATABASE}`
                        },
                    ]
                }]
            });



        }, 40000);

        bot.on('error', console.log);
        bot.once("login", () => {
            embed(`Joined ${options.host} successfully!`, "green")
            clearTimeout(timeOut);
            resolve(bot);
        });


    });
};

export default loginMineflayer;