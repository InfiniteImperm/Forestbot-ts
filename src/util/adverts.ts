const advertise = (array: Buffer) => {
    const adsArray = array.toString().split('\n');
    const num: number = Math.floor(Math.random() * adsArray.length);
    const string: string = adsArray[num];
    return string;
}
export default advertise;