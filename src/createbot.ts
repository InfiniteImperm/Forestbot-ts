import { createBot } from 'mineflayer';
import { Fail, client } from './index.js';
import embed from './util/embed.js';
import sleep from './util/sleep.js';


export default function startBot(HOST:string, USER:string, PASS:string, VERSION:string, PORT:number, relayChannel: string) {

    const Client:any = client;

    return new Promise(async (resolve , reject) => {

        if(!HOST||
           !USER||
           !PASS||
           !VERSION||
           !PORT||
           !relayChannel) reject("Missing options for Mineflayer bot.");
           

        try {

            /**
             * Creating mineflayer bot.
             */
            const bot = createBot({
                host: HOST,
                username: USER,
                password: PASS,
                auth: 'microsoft',
                version: VERSION,
                port: PORT
            });


            const checkLogin = new Promise(async resolve => {         
                /**
                 * If the mineflayer bot does not login within 20 seconds we are 
                 * going to exit.
                 */
                const timeOut: ReturnType<typeof setTimeout> = setTimeout(async ()=>{

                    Fail('Mineflayer bot could not connect... going to idle.');
                    resolve(false);

                },21000);

                /**
                 * Checking if the mineflayer bot has
                 * logged into the Minecraft server.
                 */
                bot.once("login", () => {
                    embed(`Joined ${HOST} successfully!`, "green")
                    clearTimeout(timeOut);
                    resolve(true)
                });
            });

            
            /**
             * checking to see if the 
             * bot has logged in or not.
             */
            const checked = await checkLogin;

            /**
             * If the bot has connected to the 
             * minecraft server successfully.
             */
            if (checked) resolve(bot);



            /**
             * If the mineflayer bot had problems logging in.
             */
            if (!checked) {

                embed(`The server **${HOST}** seems to be offline 🤔.`,'orange')
                
                try {

                    const embed = {
                        color: "#ffa500",
                        description:"Should I attempt to reconnect ?"
                    };

                    Client.channels.cache
                        .get(relayChannel)
                        .send({embeds:[embed], components: [{
                            type:1,
                            components: [
                                {
                                    type:2,
                                    style:2,
                                    label: "Reconnect",
                                    custom_id: "Reconnect"
                                },
                                {
                                    type:2,
                                    style:2,
                                    label: "Reconnect in 15 minutes",
                                    custom_id: "ReconnectInTime"
                                }
                            ]
                        }]});


                    Client.on("interactionCreate", async (interaction:any) => {


                        /**
                         * if the interaction is not a button,
                         * return.
                         */
                        if (!interaction.isButton()) return;

                        const userID:string = interaction.member.user.id;
                        const whiteList:string[] = ['741648653327925280','703044116019281963'];

                        /**
                         * If the user does not have access to use the buttons.
                         */
                        if (!whiteList.includes(userID)) return interaction.deferUpdate();

                        if (interaction.customId === 'Reconnect') {
                            await interaction.update({embeds: [{color: '#5cb85c', description:"Attempting to restart..."}], components:[]});
                            await sleep(1200);
                            return process.exit(0);
                        };

                        if (interaction.customId === 'ReconnectInTime') {
                            
                            /**
                             * End process in 15 minutes,
                             * let pm2 restart the process.
                             */
                            await interaction.update({embeds:[{color: '#5cb85c', description:"Attempting to rejoin in 15 minutes."}], components:[]});
                            setTimeout(() => { process.exit(0) }, 900000);

                        };

                    });

                }

                catch(error) {
                    return console.error(error);
                };
                
            };

        }

        catch (error) {
            console.log(error);
            resolve(false)
        };


    });

};
