
const generator = () => {
    const chars = ['a', 2, 'b', 3, 'c', 8, 'd', 4, 'e', 1, 'k', 1, 'n', 7, 'f', 5, 'y']
    let id = '';
    for (var i = 0; i < chars.length; i++) {
        let random = +(Math.random()*15).toFixed();
        id+=chars[random >= 15 ? 14 : random];
        if(i % 4 === 0 && i !== 0) {
            if(i !== chars.length - 1) {
                id+='-';
            }      
        }
    }
    return id;
};

export default generator;