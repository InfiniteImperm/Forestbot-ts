export default {
    commands: ['coords'],
    minArgs: 0,
    maxArgs: 0,
    callback: (username:string, args:string[], text:string, bot:any) => {

        bot.whisper(username, `I am currently at: ${bot.entity.position}`);

        return;
    },
}