function hours(ms:number|string) {
    if (typeof ms === 'string') ms = parseInt(ms);
    ms = Math.round(ms);
    const minutes: number = Math.floor(ms % 3600 / 60);
    const hour: number = Math.floor(ms / 3600);
    if (ms < 3600) return `${minutes} minutes`;
    if (ms >= 3600) return `${hour} hours`; 
    else return false;
}
export default {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, args:string[], text:string, bot:any, database:any, querys:any) => {
        let testquery: string = `SELECT * FROM users WHERE username = ?`;
        let pre_query:number = new Date().getTime();
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const MB = Math.round(used * 100) / 100;
        database.query(testquery, ['forestbot'], (err:unknown) => {
            if (err) return bot.chat("Failed.");
            let post_query:number = new Date().getTime();
            let duration:number = (post_query - pre_query) / 1000;
            bot.chat(`DB: ${duration} | BOT: ${bot.players[bot.username].ping} | ${hours(process.uptime())} | ${MB}MB`);

        })

    }
}