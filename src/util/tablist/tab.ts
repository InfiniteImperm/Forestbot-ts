import draw from './draw.js';
export default function tab(bot:any,database:any,querys:any) {
  setInterval(function () {
    let arr = [];
    const playerList = Object.keys(bot.players);
    playerList.forEach(function (i) {
      if (!bot.players[i]) return console.log("Unexpected Error.");
      let name = bot.players[i].username, ping = bot.players[i].ping;
      arr.push(`${name}:${ping}`);
    });
    draw(database, arr.sort(), querys)
  }, 20000)
}