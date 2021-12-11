import { readdir } from 'fs/promises';
import { Bot } from 'mineflayer';
import _RegisterCommands from '../commands/command-base.js';

export default async function loadCommands(database:any, querys: any, bot:Bot) {
    
    return new Promise(async (resolve,reject) => {
        try{
            const commandFiles = (await readdir('./dist/commands')).filter(file=>file.endsWith('.js'));
            
            for (const file of commandFiles) {
                if (file !== 'command-base.js') {
                    const commandModules = await import(`../commands/${file}`);
                    resolve(_RegisterCommands(commandModules, database, querys, bot));
                }

            }
        
            
        }
        catch{
            reject("Could not load commands")
        };
    })
};