import { createBot } from 'mineflayer';
import embed from './util/embed.js';
import { client } from './index.js';
import sleep from './util/sleep.js';
import { Fail } from './index.js';

export default function startBot(HOST:string, USER:string, PASS:string, VERSION:string, PORT:number) {

    const Client:any = client;

    return new Promise(async (resolve , reject) => {

        if(!HOST||!USER||!PASS||!VERSION||!PORT) reject("Missing options for Mineflayer bot.");

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


            const checkLogin = new Promise(async resolve=>{        
                
                /**
                 * If the mineflayer bot does not login within 20 seconds we are 
                 * going to exit.
                 */
                const timeOut = setTimeout(async ()=>{
                    Fail('Mineflayer bot could not connect... going to idle.');
                    resolve(false);

                },21000);

                /**
                 * Checking if the mineflayer bot has
                 * logged into the Minecraft server.
                 */
                bot.once("login", function() {
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

                embed(`The server **${HOST}** seems to be offline 🤔.`,'#ffa500')
                
                try {

                    const embed = {
                        color: "#ffa500",
                        description:"Should I attempt to reconnect ?"
                    };

                    Client.channels.cache
                        .get('898383935145406464')
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

                        const userID = interaction.member.user.id;
                        const whiteList:string[] = ['741648653327925280','703044116019281963'];

                        if (!whiteList.includes(userID)) return interaction.deferUpdate();
                        if (interaction.customId === 'Reconnect') {
                            await interaction.update({embeds: [{description:"Attempting to restart..."}], components:[]});
                            await sleep(1200);
                            return process.exit(0);
                        };

                        if (interaction.customId === 'ReconnectInTime') {
                            
                            /**
                             * End process in 15 minutes,
                             * let pm2 restart the process.
                             */
                            await interaction.update({embeds:[{description:"Attempting to rejoin in 15 minutes."}], components:[]});



                            setTimeout(() => { process.exit(0) }, 900000);

                        };

                    })
                    
                }
                catch {
                    return;
                }

                
                /**
                * If the bot cannot login we will
                * hangout in the promise
                * until manually restarded.
                */


            }

        }

        catch (error) {
            console.log(error);
            resolve(false)

        };


    });

};
