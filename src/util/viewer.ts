import { mineflayer } from 'prismarine-viewer';
export default async function viewer(bot:any, port:any) {
    return mineflayer(bot, { port: port });
}