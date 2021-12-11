export const Info = (text: string) => console.log('\x1b[34m%s\x1b[0m', `${text}`);
export const Success = (text: string) => console.log('\x1b[32m%s\x1b[0m', `${text}`);
export const Fail = (text: string) => console.error('\x1b[31m%s\x1b[0m', `${text}`);