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
module.exports = ArrayParser;