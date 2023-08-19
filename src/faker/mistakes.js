export const deleteSymbol = (str) => {
    let original = str;
    let newStr = original.replace(str[Math.floor(Math.random() * str.length-1)], "");
    return newStr;
}

export const addSymbol = (str, alpha) => {
    let original = [...str];
    let index = Math.floor(Math.random() * str.length-1);
    original.splice(index, 1, alpha[Math.floor(Math.random() * alpha.length-1)]);
    return original.join('');
}

export const replace = (str) => {
    let original = str;
    let index = Math.floor(Math.random() * str.length-1);
    let newStr = index+1 ? original.replace(index, index+1) : original.replace(index, index-1)
    return newStr;
}