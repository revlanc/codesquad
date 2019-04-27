const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const Util = require('./util');
const Model = require('./model');
const View = require('./view');
const Controller = require('./controller')
const ErrorHandler = require('./errorHandler')

const fontColorBlue = '\x1b[36m%s\x1b[0m';
const fontColorRed = '\x1b[31m%s\x1b[0m';
const initialData = [];
const maxHistoryCapacity = 3;

const util = new Util();
const model = new Model(initialData, maxHistoryCapacity);
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
            if (command === 'q') rl.close();

            try {
                command = this.util.parseCommand(command)
                const keyCommand = this.util.getKeyCommand(command);
                const restCommand = command;
                this.util.checkArgsNumber(keyCommand, restCommand);
                this.controller[keyCommand](...restCommand);
            }
            catch (e) {
                console.log(e)
                this.errorHandler.handleError(e.message)
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

//설계 컨셉 : 똑똑한 모델, 미니멀한 컨트롤러, 멍청한 뷰

//async await 활용하여 rl.prompt finally에 비동기 처리하기
//class문법으로 마이그레이션

//초기데이터 받기

//prototype 재정의 할 경우 단점 공부하기 (constructor 속성관련)

//model에서 데이터객체를 반환한걸 controller에서 받아서 view에 넘겨주니까
//controller가 굳이 있어야하나 의문이 듬
//model에서 바로 view를 호출해도 되지 않을까?
//controller의 존재 이유는 뭘까?

//update결과에 뭔가 다른 정보를 추가로 표시하고 싶다? => view를 수정. 다른데는 건들필요 없음

//data에 다른 정보를 추가로 저장하고 싶다?(ex: 작성시간) => model을 수정. 다른데는 건들필요 없음
