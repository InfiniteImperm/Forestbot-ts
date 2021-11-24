import date from 'date-and-time';

const monthYear = () => {
    const t:date = new Date();
    const p:string = date.compile("MMM DD/YY");
    return date.format(t, p);
}

const dateTime = () => {
    const t:date = new Date();
    const p:string = date.compile("MMM DD/YY");
    return date.format(t, p) + " at " + date.format(t, "hh:mmA [CDT]");
}

export {
    monthYear,
    dateTime
};