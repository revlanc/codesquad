## apply 예제코드

```javascript
function sum(a, b, c) {
  return a + b + c;
}
const arr1 = [10, 20, 30];
const result = sum.apply(null, arr1); // === sum(...arr1)
console.log(result); // 60

//---//

const arr2 = [2, 5, 1, 3, 6];
const max = Math.max.apply(null, arr2); // === Math.max(...arr2)
console.log(max); // 6
```
