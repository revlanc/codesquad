# Shallow copy & Deep copy

## Array shallow copy

```javascript
const arr = [1, 2, 3, 4, 5];
const copy = arr.slice(0);
console.log(arr); // [1, 2, 3, 4, 5]
console.log(copy); // [1, 2, 3, 4, 5]
```

## object shallow copy

```javascript
function changeAgeImpure(person) {
  var newPerson = {};
  Object.assign(newPerson, person);
  newPerson.age = 25;
  return newPerson;
}
var alex = {
  name: "Alex",
  age: 30
};
var changedAlex = changeAgeImpure(alex);
console.log(alex); // -> { name: 'Alex', age: 30 }
console.log(changedAlex); // -> { name: 'Alex', age: 25 }
```

## Deep copy (array & object)

```javascript
function copyObj(obj) {
  var copy = {};
  if (Array.isArray(obj)) {
    copy = obj.slice().map((v) => {
      return copyObj(v);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = copyObj(obj[attr]);
      }
    }
  } else {
    copy = obj;
  }
  return copy;
}
var obj = { a: 1, b: 2, c: [{ d: null, e: 'f' }] };
var obj2 = copyObj(obj);
obj2.a = 3;
obj2.c[0].d = true;
console.log(obj)
console.log(obj2))
```
