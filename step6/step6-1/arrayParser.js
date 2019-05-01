const str = "[123, [22, [55], 33], 44, [66], 77]";

class ArrayParser {
    constructor () {

    }

    tokenize(str) {
        const token = str.split(',')
        return token;
    }

    getParsedStr(str) {

    }
}

const arrayParser = new ArrayParser();

const result = arrayParser.getParsedStr(str);
console.log(result);