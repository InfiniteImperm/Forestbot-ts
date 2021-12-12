import { Client, Intents } from 'discord.js';
import handleEvents from './handleEvents.js';
import { readdir } from 'fs/promises';

const eventDir:string[] = (await readdir('./dist/Discord/events')).filter(file => file.endsWith('.js'));

const discordLogin = (token: string) => {

    return new Promise(resolve => {
        const client:Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

        try {
            client.login(token);
            client.once('ready', () => {

                handleEvents(client, eventDir);

                resolve(client);
            });
        }
        catch {
            resolve(false);
        }
    })
};

export default discordLogin;