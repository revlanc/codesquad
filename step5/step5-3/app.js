const Util = require('./util');
const Model = require('./model');
const View = require('./view');
const Controller = require('./controller')
const ErrorHandler = require('./errorHandler')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const fontColorBlue = '\x1b[36m%s\x1b[0m';
const fontColorRed = '\x1b[31m%s\x1b[0m';
const initialData = [];
const util = new Util();
const model = new Model(initialData);
const view = new View(fontColorBlue);
const controller = new Controller(model, view);
const errorHandler = new ErrorHandler(controller, fontColorRed);

const app = {
    util: util,
    controller: controller,
    errorHandler: errorHandler,
    start() {
        rl.setPrompt('명령하세요(종료하려면 "q"를 입력하세요) : ')
        rl.prompt()
        rl.on('line', (command) => {
            if (command === 'q') rl.close()
            try {
                command = this.util.parseCommand(command)
                const keyCommand = this.util.getKeyCommand(command);
                const restCommand = command;
                console.log(keyCommand, restCommand)
                this.util.checkArgsNumber(keyCommand, restCommand);
                this.controller[keyCommand](...restCommand);
            }
            catch (e) {
                console.log(e, e.message)
                const errorType = this.errorHandler.getErrorType(e.message)
                if (errorType) {
                    this.errorHandler[errorType](e.message)
                } else {
                    this.errorHandler.printOtherErrors();
                }
            }
            finally {
                setTimeout(() => rl.prompt(), 0)
            }
        })
        rl.on('close', () => {
            process.exit()
        })
    }
}
app.start()

//모듈분리. 파일하나에 클래스하나
//생성자함수 인자로 받기

//model이 데이터객체를 반환하도록 수정
//view가 데이터객체를 받아서 디스트럭쳐링 후 출력하게 수정? 이렇게하면 협업하기에는 좋을 것 같은 느낌

//undo, redo 구현
//async await 활용하여 rl.prompt finally에 비동기 처리하기
//class문법으로 마이그레이션

//error객체 console.log 합치기
//초기데이터 받기

//prototype 재정의 할 경우 단점 공부하기 (constructor 속성관련)