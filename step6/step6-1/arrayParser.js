const str = "[123, [22, [55], 33], 44, [66], 77]";

class ArrayParser {
    constructor() {
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
        const token = this.tokenize(str);
        token.forEach(element => {
            this.nodeQueue.push(this.decideType(element));
        });
        const rootNode = this.nodeQueue.shift();
        while (this.nodeQueue.length !== 0) {
            this.parseToken(rootNode);
        }
        return rootNode;
    }
}

const arrayParser = new ArrayParser();

const result = arrayParser.getParsedStr(str);
console.log(JSON.stringify(result, null, 2));