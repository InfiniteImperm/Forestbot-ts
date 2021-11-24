import embed from '../util/embed.js';

let errorCount:number = 0;

export default {
    name: 'error',
    once: false,
    async execute(content:any) {
        console.error(content);    
        if (errorCount > 3) {
            errorCount = 0;
            embed(`<@703044116019281963> Check console please.`,'#ffa500');
        }
        return errorCount++;
    }
};