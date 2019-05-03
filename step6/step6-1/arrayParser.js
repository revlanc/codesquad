const str = "[123, [22, [55], 33], 44, [66], 77]";

class Tokenizer {
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
    
    tokenizeByChar(str, char) {
        str = this.insertComma(str);
        str = this.removeWhiteSpace(str);
        const token = str.split(char)
        return token;
    }
}

class Lexer {
    decideType(token) {
        if (token === '[') {
            const obj = {
                type: 'array',
                child: []
            }
            return obj;
        }
        if (isFinite(token) && token !== null) {
            const obj = {
                type: 'number',
                value: token,
                child: []
            }
            return obj;
        }
        if (token === ']') {
            const obj = {
                type: 'end'
            }
            return obj;
        }
    }
}

class ArrayParser {
    constructor(tokenizer, lexer) {
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.nodeQueue = []
    }

    parseToken(parentNode) {
        const node = this.nodeQueue.shift();
        if (node.type === 'end') {
            return parentNode;
        } else if (node.type === 'array') {
            let childNode;
            while (true) {
                childNode = this.parseToken(node);
                if (childNode) break;
            }
            parentNode.child.push(childNode);
        } else {
            parentNode.child.push(node);
        }
    }

    getParsedStr(str) {
        const token = this.tokenizer.tokenizeByChar(str, ',');
        token.forEach(element => {
            this.nodeQueue.push(this.lexer.decideType(element));
        });
        const rootNode = this.nodeQueue.shift();
        while (this.nodeQueue.length) {
            this.parseToken(rootNode);
        }
        return rootNode;
    }
}

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser(tokenizer, lexer);

const result = arrayParser.getParsedStr(str);
console.log(JSON.stringify(result, null, 2));