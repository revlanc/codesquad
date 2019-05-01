const str = "[123, [22, [55], 33], 44, [66], 77]";

class ArrayParser {
    constructor () {

    }

    insertComma(str) {
        str = str.replace(/\[/g, '[,');
        str = str.replace(/\]/g, ',]');
        return str;
    }

    removeWhiteSpace(str) {
        str = str.split(' ');
        str = str.join('');
        return str;
    }

    tokenize(str) {
        str = this.insertComma(str);
        str = this.removeWhiteSpace(str);
        const token = str.split(',')
        return token;
    }

    getParsedStr(str) {
        const token = this.tokenize(str);
        return token;
    }
}

const arrayParser = new ArrayParser();

const result = arrayParser.getParsedStr(str);
console.log(result);