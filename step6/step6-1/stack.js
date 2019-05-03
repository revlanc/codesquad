class VariableStack {
    constructor() {
        this.stck = []
    }
    push(item) {
        this.stck.push(item);
    }
    pop() {
        this.stck.pop();
    }
    size() {
        return this.stck.length;
    }
    top() {
        return this.stck[this.stck.length - 1];
    }
    isEmpty() {
        if (this.stck.length === 0) return true;
        return false;
    }
}
const a = 'a';
const b = 'b';
const c = 'c';
const variableStack = new VariableStack();
// variableStack.push(a)
// variableStack.push(b)
// variableStack.push(c)
// console.log(variableStack.stck)
// variableStack.pop()
// console.log(variableStack.stck)
// console.log(variableStack.size())
// console.log(variableStack.top())
// console.log(variableStack.isEmpty())

class FixedSizeStack {
    constructor(size) {
        this.stck = new Array(size);
        this.MAXSIZE = size;
        this.top = 0;
    }
    FSpush(item) {
        this.stck[this.top] = item;
        this.top += 1;
    }
    FSpop() {
        this.stck[this.top - 1] = undefined;
        this.top -= 1;
    }
    FSsize() {
        return this.top;
    }
    FStop() {
        return this.stck[this.top - 1];
    }
    FSisEmpty() {
        if (this.top === 0) return true;
        return false;
    }
}
const fixedSizeStack = new FixedSizeStack(10);
fixedSizeStack.FSpush(a)
fixedSizeStack.FSpush(b)
fixedSizeStack.FSpush(c)
console.log(fixedSizeStack.stck)
console.log(fixedSizeStack.FSpop())
console.log(fixedSizeStack.stck)
console.log(fixedSizeStack.FSsize())
console.log(fixedSizeStack.FStop())
console.log(fixedSizeStack.FSisEmpty())