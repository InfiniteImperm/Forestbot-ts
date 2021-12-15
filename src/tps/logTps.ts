const logTps = (database: any, bot: any) => {
    database.query('INSERT INTO Tps (TPS, time) VALUES (?,?)',
        [parseInt(bot.getTps()), Date.now()],
        (err: unknown) => {
            if (err) throw err;
        });
        return;
}
export default logTps;