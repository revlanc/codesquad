# 생성자함수를 통해 생성된 객체의 constructor속성

```javascript
var util = function() {
  this.getName = function() {
    return this.name;
  };
  this.setName = function(name) {
    this.name = name;
  };
};

function Name(name) {
  this.name = name;
}

util.call(Name.prototype);

var myName = new Name("allen");
myName.constructor === Name; //true
```

```javascript
function Job(job) {
  this.job = job;
}

Job.prototype = {
  getJob() {
    return this.job;
  },
  setJob(job) {
    this.job = job;
  }
};

var myJob = new Job("lala");
myJob.constructor === Job; //false
```

Job.prototype = {}으로 프로토타입을 재정의하면 job의 constructor 속성이 사라진다.  
생성자함수를 통해 생성된 객체의 constructor 속성을 생성자함수와 비교하면 어떤함수에 의해 생성된 객체인지 알 수 있다.  
prototype에 메서드를 추가하면서 constructor 속성을 살리려면 다음과 같이 사용하면 된다.

```javascript
Job.prototype.getJob = function() {
  return this.job;
};
Job.prototype.setJob = function() {
  this.job = job;
};
```
