import 'dotenv/config';
import { readFile } from 'fs/promises';

if (!process.env.USE_MINEFLAYER ||
    !process.env.USE_DATABASE   ||
    !process.env.USE_DISCORD    ||
    !process.env.MC_HOST        ||
    !process.env.MC_USER        ||
    !process.env.MC_PASS        ||
    !process.env.DATABASE       ||
    !process.env.DATABASE_HOST  ||
    !process.env.DATABASE_USER  ||
    !process.env.DATABASE_PASS  ||
    !process.env.TOKEN          ||
    !process.env.MC_VERSION     ||
    !process.env.MC_PORT
) {
    (() => {
        console.error("Error. Missing .env config. exiting...");
        process.exit(1);
    })();
};

export default {
    bot_options: {
        host: process.env.MC_HOST,
        username: process.env.MC_USER,
        password: process.env.MC_PASS,
        auth: 'microsoft',
        version: process.env.MC_VERSION,
        port: process.env.MC_PORT
    },
    database_options: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE
    },
    token: process.env.TOKEN,
    querys: (async () => await readFile('./querys.json')),
    bot_config: (async () => await readFile('./bot_config.json')),
}