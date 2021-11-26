import { client, channels } from '../index.js';


export default async function embed(text:string,color:string) {

    if (!client) return;
    const Client: any = client;

    if (!channels || channels.length <= 0 || !text || !color) 
        return console.error("Missing Embed parameters.");

    try {

        channels.forEach((channel) => {

            return Client.channels.cache
                .get(channel)
                .send({ embeds: [{color:color, description:text}]});
    
        });

    }

    catch (error) {

        return console.error('\x1b[31m%s\x1b[0m',"Error while trying to send embed.");

    };

};