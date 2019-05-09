const Tokenizer = require('./tokenizer');
const Lexer = require('./lexer');
const ArrayParser = require('./arrayParser');

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const arrayParser = new ArrayParser(tokenizer, lexer);

const str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
const result = arrayParser.getParsedStr(str);
console.log(JSON.stringify(result, null, 2));