export default {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, message:string, args:any[], text:any, bot:any, database:any, querys:any) => {

        bot.chat("okay it worked.")

    }
}