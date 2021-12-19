export default { 
    commands: ['wiki'],
    minArgs:0,
    maxArgs:0,
    callback: (username:string, args:string[], text:string, bot:any, database:any, querys:any) => {
        return bot.chat(`https://simplyvanilla.miraheze.org/wiki/Main_Page`)
    }
