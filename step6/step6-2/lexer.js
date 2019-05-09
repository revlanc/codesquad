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
module.exports = Lexer;