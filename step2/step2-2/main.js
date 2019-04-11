const lists = [];
function circleArea(radius, otherRadius) {
    let answer = 0;
    if (otherRadius === undefined) {
        checkArguments(radius)
        answer = Math.PI * radius * radius;
        lists.push(`circle : ${answer}`)
    } else {
        checkArguments(radius, otherRadius)
        answer = accumulateCircle(radius, otherRadius);
        lists.push(`circle : ${answer}`)
    }
    return answer;
}

function squareArea(width, height) {
    checkArguments(width, height)
    let answer = width * height;
    lists.push(`square : ${answer}`)
    return answer;
}

function trapezoidArea(top, bottom, heigth) {
    checkArguments(top, bottom, heigth)
    let answer = (top + bottom) * heigth / 2;
    lists.push(`trapezoid : ${answer}`)
    return answer;
}

function cylinderArea(radius, height) {
    checkArguments(radius, height)
    let answer = circleArea(radius) * height;
    lists.push(`cylinder : ${answer}`)
    return answer;
}

function checkArguments(...args) {
    for (const value of args) {
        if (typeof value === 'undefined') {
            throw Error('인자갯수가 부족합니다.')
        } else if (typeof value !== 'number') {
            throw Error('입력값이 숫자가 아닙니다')
        }
    }
}

function getArea(type, ...args) {
    const polygonType = {
        'circle': circleArea,
        'square': squareArea,
        'trapezoid': trapezoidArea,
        'cylinder': cylinderArea
    }
    return polygonType[type](...args)
}

function accumulateCircle(start, end) {
    if (start === end) {
        return circleArea(start);
    } else if (start < end) {
        return circleArea(start) + accumulateCircle(start + 1, end)
    } else {
        return circleArea(end) + accumulateCircle(end + 1, start)
    }
}

function printExecutionSequence() {
    let message = '<계산수행순서> \n';
    return message + lists.join('\n')
}

console.log(circleArea(2))
console.log(getArea('circle', 1))
console.log(getArea('circle', 3, 1))
console.log(getArea('square', 3, 1))
console.log(getArea('cylinder', 3, 1))
console.log(getArea('trapezoid', 3, 1, 2))
console.log(printExecutionSequence());