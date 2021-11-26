import { mineflayer } from 'prismarine-viewer';
export default async function viewer(bot:any, port:string | number) {
    return mineflayer(bot, { port: port });
}