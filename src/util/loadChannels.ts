import { RowDataPacketLiveChat} from "../../Types";
import { promisify } from "util";

export default {
    loadChannels: async (database: any) => {
        const query = promisify(database.query).bind(database);
        if (!database) return;
        
        const channels: string[] = [];
        const Channels:Array<RowDataPacketLiveChat> = await query('SELECT * FROM livechats');

        Channels.forEach(element => {   
            channels.indexOf(element.channelID) === -1 || null
            ? channels.push(element.channelID)
            : 0;
        });

        return channels;
  
    }
};