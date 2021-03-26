export default  (value: number | string) => {
    if (typeof value === 'undefined') {
        value = 0
    }
    if (typeof value === 'string') {
        try {
            value = parseFloat(value)
        } catch (e) {
            console.log('RoundNumber: cant convert "', value, '" to number, reset to 0' )
            value = 0
        }
    }
    const [_, signs] = String(value).split('.');
    if(!signs) return value
    if(signs.length > 2) return Number(value).toFixed(2);
    return value;
}
