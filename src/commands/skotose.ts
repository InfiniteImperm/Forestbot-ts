export default { 
    commands: ['skotose'],
    minArgs:0,
    maxArgs:0,
    callback: (username:string, args:string[], text:string, bot:any, database:any, querys:any) => {
        await sleep(600);
        var word1 = ["Bro we are making a strip club", "https://www.youtube.com/channel/UCom74ILXH9-BANx9dCL_bvg", "Let's gooooooooooooooo", "thicc chicken at his base", "i guess subscribing is the most important part", "What's wrong with you?", "Why are you guys smelling me", "oh you are so trash, get outbrained by sko... *dies*", "nobody knows where i am *dies 17s later to someone who knew*", "What the fuck do you do in your free time InfiniteImperm?", "Bruh you are so fucking stupid"];
        var r = Math.floor(Math.random() * word1.length);
        bot.chat(word1[r])
    }
}
