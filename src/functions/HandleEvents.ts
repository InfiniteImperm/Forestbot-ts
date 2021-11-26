export default async function handleEvents(bot:any, eventDir:any, bot_config:any, database:any, querys:any) {

    for (const file of eventDir) {

        const func:any = await import(`../events/${file}`);
        const event = func.default;

        if(event.once) {
            bot.once(event.name, (...args:any) => event.execute(...args, bot, bot_config, database, querys));
        }
        
        else {
            bot.on(event.name, (...args:any) => event.execute(...args, bot, bot_config, database, querys));
        }

    }


}