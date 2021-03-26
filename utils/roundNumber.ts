export default  (value: number) => {
    const [_, signs] = String(value).split('.');
    if(!signs) return value
    if(signs.length > 2) return Number(value).toFixed(2);
    return value;
}