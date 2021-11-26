/**
 * Types for database querys
 */
export type RowDataPacketLiveChat = {
    guildName: string,
    guildID: string,
    channelID: string,
    setupBy: string,
    date: number | string | null | Date
};

export type RowDataPacketJoindate = {
    username: string,
    joindate: string | null 
};

export type RowDataPacketPlaytime = {
    username: string,
    playtime: string | null
};

export type RowDataPacketKills = {
    username: string,
    kills: number,
    deaths: number
};

export type RowDataPacketLastseen = {
    username: string,
    lastseen: string | null
};

export type RowDataPacketMsgcount = {
    name: string, 
    cnt: number
};

export type RowDataPacketQuote = {
    name: string, 
    message: string, 
    date: string | null
};