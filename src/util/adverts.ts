const advertise = (array: string[]) => {
    const num: number = Math.floor(Math.random() * array.length);
    const string: string = array[num];
    return string;
}

export default advertise;