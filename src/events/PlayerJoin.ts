import { dateTime } from '../util/time.js';
import embed from '../util/embed.js';

let active = false;
setTimeout(() => active = true , 9009);

export default { 
    name: 'playerJoined',
    once: false,
    async execute(player:any, bot:any, bot_options:any, database:any, querys:any) {

        if (!active) return;

        embed(`${player.username} joined the server!`, "#00FF00");

        if (!database) return;

        async function saveUser(player:any) {
               
                database.query(querys.checkUser, [player.uuid], (error:any, results:any) => {
                    
                    if (error) return console.log(error);

                    if (!results.length) {
                        
                        database.query(querys.insertUser, [
                            player.username,
                            0,
                            0,
                            dateTime(),
                            player.uuid
                        ]);
                    
                        if (bot_options.welcomeMessages) bot.chat(`${player.username} joined for the first time!`);
                        return;
                    }


                    if (results.length) {

                        let dbUser = results[0].username;
                        let dbUuid = results[0].uuid;

                        if (player.uuid === dbUuid && player.username !== dbUser) {
                            
                            bot.chat(`Player: ${player.username}, previously known as: ${dbUser} joined.`);
                            
                            database.query(querys.UpdateExistingUser, [player.username, dbUser], (err:any,res:any)=> {
                               
                                if (err) return console.error(err);
                               
                                return;
                            })

                        }

                    }
                    return;

                })
        };


        await saveUser(player);
        database.query(querys.updateJoins, [dateTime(), player.username]);
        return
    }
}