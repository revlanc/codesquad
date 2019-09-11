# ES6 Module

- module은 HTML 파싱이 완료된 이후에 지연 '실행'된다
- defer속성과 동일하게 동작한다
- '실행'된다는 의미는 자바스크립트 콜스택에 스크립트의 실행컨텍스트가 올라간다는 의미

<!-- - 스크립트의 비동기코드는 이벤트큐에 들어간다
- promise 역시 마찬가지로 비동기 코드이지만, 이벤트큐가 아닌 microtask 큐에 들어간다

- 만약 콜스택이 비어있다면 microtask가 실행될 지 체크한다 -->

## task와 microtask

- 자바스크립트의 실행 순서는 task와 microtack에 의해 관리된다
- 기본적으로 모든 스크립트는 task에 순서대로 예약되어 실행된다
- 기본적으로 1개의 스크립트파일은 1개의 task를 가진다
- setTimeout, setInterval과 같은 비동기코드는 별도의 task를 가진다
- 비동기코드를 만나면 현재 실행되는 task다음에 실행될 task로 예약된다
- promise는 특별히 microtask에 예약된다
- microtask는 task보다 우선적으로 실행된다
- 현재 실행중인 task가 스택에서 비워지면, 예약된 microtask가 있는지 확인하고, 있으면 microtask를 스택에 올린다.
- (task와 실행컨텍스트가 거의 동일한 의미인것 같은데 어떻게 통합해서 설명해야할지는 아직 모르겠다)

## 예제

### module을 나중에 불러온 경우

```javascript
<body>
  <script src="load.js" />
  <script type="module" src="app.js" />
</body>
```

#### 1. module에 import 키워드가 없을경우

- **결과** : app.js가 fetch보다 먼저 실행된다
- **실행순서**
  - (1) load.js가 실행된다(load.js의 전역컨텍스트가 스택에 올라간다)
  - (2) fetch가 스택에 올라간다
  - (3) microtask로 콜백을 넘기고 스택에서 빠진다
  - (4) load.js의 실행이 완료되고 스택에서 빠진다
  - (5) app.js의 전역컨텍스트가 스택에 올라간다
  - (6) app.js의 실행이 완료되고 스택에서 빠진다
  - (7) 스택이 비었으므로 이벤트루프가 microtask에 대기중인 콜백을 스택에 올린다
  - (8) 콜백이 실행된다
- **의문점**
  - (4)에서 스택이 비게되는데 이때는 microtask를 스택에 올리지 않는건지?
  - load.js에 오래걸리는 작업을 넣어서 fetch가 load.js종료 이전에 완료되게 하더라도 콜백이 먼저 실행되지 않는 현상이 있음
  - 아마 모든 스크립트 파일을 감싸는 전역컨텍스트가 스택에 있는것이 아닐까.. 하는 추측을 해봄

#### 2. module에 import 키워드가 있을경우

- **결과** : fetch의 콜백이 app.js보다 먼저 실행된다
- **실행순서**
  - (1) load.js의 전역컨텍스트가 스택에 올라간다
  - (2) fetch가 스택에 올라간다
  - (3) microtask로 콜백을 넘기고 스택에서 빠진다
  - (4) load.js의 실행이 완료되고 스택에서 빠진다
  - (5) app.js의 전역컨텍스트가 스택에 올라간다
  - (6) import키워드가 있으므로 module의 모든 내용을 별도의 task로 예약한다. 연결된 모든 module을 합쳐서 1개의 스크립트(task)로 만든 후 예약되어야하기 때문에 entry point는 새로운 task를 만들고 스택에서 빠진다
  - (7) 스택이 비었으므로 microtask에서 대기중인 콜백을 스택에 올린다
  - (8) 콜백이 실행되고 스택에서 빠진다
  - (9) 다음 task인 module이 스택에 올라오고 실행된다

### module을 먼저 불러온 경우

```javascript
<body>
  <script type="module" src="app.js" />
  <script src="load.js" />
</body>
```

- 이렇게 두면 스크립트의 실행 순서를 보장할 수 없다
- load.js의 fetch가 오래걸리는 작업이더라도 먼저 출력되기도 한다
- app.js가 오래걸리는 작업이더라도 먼저 출력되기도 한다
- module에 import키워드가 없다면 그냥 app.js가 먼저 실행된다
