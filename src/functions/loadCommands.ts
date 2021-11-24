import {readdir} from 'fs/promises';
import _RegisterCommands from '../commands/command-base.js';
export default async function loadCommands(bot:any,database:any,querys:any) {
    return new Promise(async(resolve,reject)=>{
        try{
            const commandFiles = (await readdir('./dist/commands')).filter(file=>file.endsWith('.js'));
            
            for (const file of commandFiles) {
                if (file !== 'command-base.js') {
                    const commandModules = await import(`../commands/${file}`);

                    resolve(_RegisterCommands(commandModules, bot, database, querys));
                }

            }
        
            
        }
        catch{reject("Could not load commands")};
    })
};