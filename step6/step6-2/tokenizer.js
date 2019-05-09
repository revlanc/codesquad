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
module.exports = Tokenizer;