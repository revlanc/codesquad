function nor(a, b) {
    return !(a || b)
}

// const nor = (a, b) => !(a || b);

console.log(nor(true, true))
console.log(nor(true, false))
console.log(nor(false, true))
console.log(nor(false, false))