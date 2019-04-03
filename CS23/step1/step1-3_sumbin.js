function sum(a, b) {
    return !(a === b) ? 1 : 0
}
//!(a === b) 의 결과가 true false로 출력되어서 숫자로 바꿔줌

function carry(a, b) {
    return a && b;
}

function halfadder(bitA, bitB) {
    return [carry(bitA, bitB), sum(bitA, bitB)]
}

function fullAdder(bitA, bitB, carry){
    const [co1, s1] = halfadder(bitA,bitB);
    const [co2, s2] = halfadder(carry,s1);
    const co3 = co1 || co2;
    return [co3, s2];
}

function sumEightBit(a, b) {
    const carry = [0];
    const answer = [];
    for(let i = 0; i < a.length; i++) {
        [carry[i + 1], answer[i]] = fullAdder(a[i], b[i], carry[i]);
    }
    answer.push(carry[a.length])
    return answer;
}

// console.log(halfadder(0, 0))
// console.log(halfadder(0, 1))
// console.log(halfadder(1, 0))
// console.log(halfadder(1, 1))

// console.log(fullAdder(0, 0, 1))
// console.log(fullAdder(0, 1, 0))
// console.log(fullAdder(1, 0, 1))
// console.log(fullAdder(1, 1, 1))

// console.log(sumEightBit([ 1, 1, 0, 1, 1, 0, 1, 0 ], [ 1, 0, 1, 1, 0, 0, 1, 1 ]))
// console.log(sumEightBit([ 1, 1, 0, 0, 1, 0, 1, 0 ], [ 1, 1, 0, 1, 1, 0, 0, 1 ]))