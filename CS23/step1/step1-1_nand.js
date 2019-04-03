function nand(a, b) {
    return !(a && b)
}

console.log(nand(true, true))
console.log(nand(true, false))
console.log(nand(false, true))
console.log(nand(false, false))