const myReduce = (arr, callback, initialValue) => {
    if (initialValue === undefined) {
        let result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            result = callback(result, arr[i])
        }
        return result;
    } else {
        let result = initialValue
        arr.forEach(element => result = callback(result, element))
        return result;
    }
}

const arr1 = [1, 2, 3, 4, 5]
const arr2 = [[1, 2], [3, 4], [5, 6]]
const arr3 = [{ x: 1 }, { x: 2 }, { x: 3 }]
const arr4 = [{ Kim: 90 }, { Lee: 95 }, { Park: 85 }]

console.log(myReduce(arr1, (acc, cur) => acc + cur))
console.log(myReduce(arr1, (acc, cur) => acc * cur))
console.log(myReduce(arr1, function (acc, cur) { if (cur % 2 !== 0) { acc.push(cur * 2) } return acc }, []))
console.log(myReduce(arr2, (acc, cur) => acc.concat(cur), []))
console.log(myReduce(arr3, (acc, cur) => acc + cur.x, 0))
console.log(myReduce(arr4, function (acc, cur) { for (let key in cur) { if (cur[key] >= 90) { acc.push(key) } } return acc }, []))