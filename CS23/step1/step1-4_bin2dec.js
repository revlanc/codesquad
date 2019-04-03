function dec2bin(decimal) {
    var answer = [];
    while(decimal !== 0) {
        answer.push(decimal % 2);
        decimal = parseInt(decimal / 2);
        console.log(decimal);
    }
    return answer;
}

console.log(dec2bin(10));
console.log(dec2bin(173));


function pow(a,b){
    let answer = 1;
    for(let i = 0; i < b; i++){
        answer *= a;
    }
    return answer;
}

function bin2dec(bin){
    const len = bin.length;
    let answer = 0;
    for(let i=0; i<len; i++){
        answer += pow(2,i) * bin[i]
    }
    return answer
}

// console.log(bin2dec([0,1,1,1]));
// console.log(bin2dec([1,1,1,1,0,1,0,1]));