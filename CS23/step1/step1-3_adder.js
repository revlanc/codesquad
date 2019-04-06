function nand(a, b) {
    return !(a && b) ? 1 : 0
}

function nor(a, b) {
    return !(a || b) ? 1 : 0
}

function xor(a, b) {
    return nand(a, b) && (a || b) ? 1 : 0;
}
// console.log(xor(0, 0))
// console.log(xor(0, 1))
// console.log(xor(1, 0))
// console.log(xor(1, 1))

function carry(a, b) {
    return a && b ? 1 : 0;
}

function halfAdder(bitA, bitB) {
    return [xor(bitA, bitB), carry(bitA, bitB)]
}

// console.log(halfadder(0, 0))
// console.log(halfadder(0, 1))
// console.log(halfadder(1, 0))
// console.log(halfadder(1, 1))

function fullAdder(bitA, bitB, carry) {
    const [sum1, co1] = halfAdder(bitA, bitB);
    const [sum2, co2] = halfAdder(carry, sum1)
    return [sum2, co1 || co2]
}

// console.log(fullAdder(0, 0, 1))
// console.log(fullAdder(0, 1, 1))
// console.log(fullAdder(1, 0, 1))
// console.log(fullAdder(1, 1, 1))

function byteAdder(a, b) {
    const carry = [0];
    const answer = [];
    for (let i = 0; i < a.length; i++) {
        [answer[i], carry[i + 1]] = fullAdder(a[i], b[i], carry[i]);
    }
    answer.push(carry[carry.length - 1])
    return answer;
}

console.log(byteAdder([1, 1, 0, 1, 1, 0, 1, 0], [1, 0, 1, 1, 0, 0, 1, 1]))
console.log(byteAdder([1, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 1, 1, 0, 0, 1]))
console.log(byteAdder([1, 1, 0, 1], [1, 0, 0, 1]))