import 'dotenv/config';
import { readFile } from 'fs/promises';
export default function Check() {
    return new Promise(async (resolve, reject) => {

        if (typeof process !== 'undefined' && parseInt(process.versions.node.split('.')[0]) < 16) {
            console.error("Incorrect node version. Please use 16.10.0");
            process.exit(1);
        };

        if (!process.env.PROD               ||
            !process.env.USE_MINEFLAYER     ||
            !process.env.USE_DATABASE       ||
            !process.env.USE_DISCORD        ||
            !process.env.MC_LOCALHOST       ||
            !process.env.MC_HOST            ||
            !process.env.MC_USER            || 
            !process.env.MC_PASS            ||
            !process.env.DATABASE           ||
            !process.env.TEST_DATABASE      ||
            !process.env.DATABASE_LOCALHOST ||
            !process.env.DATABASE_HOST      ||
            !process.env.DATABASE_USER      ||
            !process.env.DATABASE_PASS      ||
            !process.env.TESTTOKEN          ||
            !process.env.TOKEN              ||
            !process.env.MC_VERSION         ||
            !process.env.MC_PORT    
            ) {
                reject("Missing .env configuration.")
            };

        
            let MC_HOST:string = process.env.MC_LOCALHOST;
            let DATABASE_HOST:string = process.env.DATABASE_LOCALHOST;
            let DISCORD_TOKEN:string = process.env.TESTTOKEN;
            let DATABASE:string = process.env.TEST_DATABASE;

            const _PROD:boolean = process.env.PROD === 'true'
                                ? true
                                : false;

            const USE_MINEFLAYER:boolean = process.env.USE_MINEFLAYER === 'true'
                                         ? true
                                         : false;

            const USE_DISCORD:boolean = process.env.USE_DISCORD === 'true' 
                                      ? true 
                                      : false;

            const USE_DATABASE:boolean = process.env.USE_DATABASE === 'true'
                                       ? true       
                                       : false; 


            if (_PROD) {

                MC_HOST = process.env.MC_HOST;
                DATABASE_HOST = process.env.DATABASE_HOST;
                DISCORD_TOKEN = process.env.TOKEN;
                DATABASE = process.env.DATABASE

            };

            let bot_config:any;
            let querys:any;


            try {

                const querys_unparsed:any = await readFile('./querys.json');
                querys = JSON.parse(querys_unparsed);

                const bot_config_unparsed:any = await readFile('./bot_config.json');
                bot_config = JSON.parse(bot_config_unparsed);

            } 

            catch {
                reject("Error loading querys.json or bot_options.json");
            }

            const env_options:object = {
                USE_DISCORD:USE_DISCORD,
                USE_MINEFLAYER:USE_MINEFLAYER,
                USE_DATABASE:USE_DATABASE,
                MC_HOST:MC_HOST,
                MC_USER:process.env.MC_USER,
                MC_PASS:process.env.MC_PASS,
                MC_VERSION:process.env.MC_VERSION,
                MC_PORT:process.env.MC_PORT,
                DATABASE_USER: process.env.DATABASE_USER,
                DATABASE_PASS: process.env.DATABASE_PASS,
                DATABASE_HOST:DATABASE_HOST,
                DISCORD_TOKEN:DISCORD_TOKEN,
                DATABASE:DATABASE,
                bot_config:bot_config,
                querys:querys
            };

            resolve(env_options);
        
    });
};