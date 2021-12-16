import { client, channels } from '../index.js';
export default async function embed(text: string, color: string) {
    const Client: any = client;
    if (!client || !channels || channels.length <= 0 || !text || !color) return;
    switch (color) {
        case 'green':
            color = '#5cb85c'
            break;

        case 'purple':
            color = '#A100E1'
            break;

        case 'pink':
            color = '#ff748c'
            break;

        case 'grey':
            color = '#292b2c'
            break;

        case 'red':
            color = '#d9534f'
            break;

        case 'orange':
            color = '#ffa500'
            break;
    }
    try {
        channels.forEach(channel => {
            return Client.channels.cache
                .get(channel)
                .send({ embeds: [{ color: color, description: text }] });
        });
    }
    catch {
        return console.error('\x1b[31m%s\x1b[0m', "Error while trying to send embed.");
    };
};