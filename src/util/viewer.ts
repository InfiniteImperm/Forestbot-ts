import { mineflayer } from 'prismarine-viewer';
const viewer = (bot: any, port: string | number) => mineflayer(bot, { port: port});
export default viewer;