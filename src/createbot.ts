import { createBot } from 'mineflayer';
import embed from './util/embed.js';

export default function startBot(HOST:string, USER:string, PASS:string, VERSION:string, PORT:number) {

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
                const timeOut = setTimeout(()=>{
                    console.error('\x1b[31m%s\x1b[0m', 'Mineflayer bot could not connect... Exiting.');
                    bot.quit();
                },20000);

                /**
                 * Checking if the mineflayer bot has
                 * logged into the Minecraft server.
                 */
                bot.once("login", function() {
                    clearTimeout(timeOut);
                    resolve(true)
                });
            });

            
            const checked = await checkLogin;
            if (checked) resolve(bot);

        }

        catch (error) {
            console.log(error);
            resolve(false)

        };


    });

};
