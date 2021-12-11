export default async function handleEvents(client:any, eventDir:any) {


    for (const file of eventDir) {
            

        /**
         * Importing each event file.
         */
        const func:object = await import(`./events/${file}`);
        const event = func['default'];

        /**
         * if event is .once
         */
        if (event.once) {
            client.once(event.name, (...args:any) => event.execute(...args, client));
        }

        /**
         * if event is .on
         */
        else {
            client.on(event.name, (...args:any) => event.execute(...args, client));
        };

        
    };
}