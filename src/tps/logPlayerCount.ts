const logPlayerCount = (database: any, bot: any) => {
    const playerCount: number = Object.keys(bot.players).length;
    database.query('INSERT INTO Playercount (count , time) VALUES (?,?)',
        [playerCount, Date.now()],
        (err: unknown) => {
            if (err) throw err;
        });
    return;
}
export default logPlayerCount;