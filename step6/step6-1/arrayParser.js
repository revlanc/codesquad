const str = "[123, [22, [55], 33], 44, [66], 77]";

class ArrayParser {
    constructor () {
        this.nodeQueue = []

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

    decideType(token) {
        if(token === '[') {
            const obj = {
                type: 'array',
                child: []
            }
            return obj;
        }
        if(isFinite(token) && token !== null) {
            const obj = {
                type: 'number',
                value: token,
                child: []
            }
            return obj;
        }
        if(token === ']') {
            const obj = {
                type: 'end'
            }
            return obj;
        }
    }

    getParsedStr(str) {
        const token = this.tokenize(str);
        token.forEach(element => {
            this.nodeQueue.push(this.decideType(element));
        });
        return token;
    }
}

const arrayParser = new ArrayParser();

const result = arrayParser.getParsedStr(str);
console.log(result);