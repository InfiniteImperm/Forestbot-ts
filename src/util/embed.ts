import { client, channels } from '../index.js';
const Client:any = client;

export default async function embed(text:string,color:string) {

    if (!channels || channels.length <= 0 || !client || !text || !color) 
        return console.error("Missing Embed parameters.");

    try {

        channels.forEach((channel:string) => {

            return Client.channels.cache
                .get(channel)
                .send({ embeds: [{color:color, description:text}]});
    
        })

    }

    catch (error) {

        return console.error('\x1b[31m%s\x1b[0m',"Error while trying to send embed.")

    };

};