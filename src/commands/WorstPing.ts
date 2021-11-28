export default { 
    commands: ['worstping', 'wp'],
    minArgs:0,
    maxArgs:0,
    callback: (username:string, message:string, args:string[], text:string, bot:any, database:any, querys:any) => {
        const h:any[] = Object.entries(bot.players).sort((a:any[],b:any[]) => b[1].ping - a[1].ping);
        return bot.chat(`Worst Ping: [${h[0][0]}]: ${bot.players[h[0][0]].ping}ms`)
    }
};