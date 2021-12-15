export default {
    commands: ['faq', 'fact'],
    minArgs: 0,
    maxArgs: 20,
    callback: (username: string, args: string[], text: string, bot: any, database: any, querys: any) => {

        if (args[0] === 'add') {
            if (args.length < 2) return bot.whisper(username, "When adding a fact please also enter in a fact");
            args.shift();
            let string = args.join(' ');
            if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(string)) return bot.whisper(username, "No special characters");
            console.log(string);
            database.query(querys.saveFact,
                [username, string, Date.now()],
                (err: unknown, res: any) => {
                    if (err) {
                        bot.whisper(username, "There was a problem saving your fact. sorry.")
                        return console.error(err);
                    }
                    return bot.whisper(username, `Saved your fact successfully. fact ID: ${res.insertId}`);
                })
        }

        else if (/\d/.test(args[0])) {

            database.query(querys.searchFact,
                [args[0]]
                , (err: unknown, res: any[]) => {
                    if (err || !res.length) return bot.whisper(username, `The fact ID: ${args[0]} does not exist.`);

                    bot.chat(`[FACT: ${res[0].id}]: ${res[0].fact}`);

                })

        }

        else {
            return bot.whisper(username, "Adding fact: !fact add <fact> | Searching fact:  !fact <ID>")
        }

        return;

    }
}