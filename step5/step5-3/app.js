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
    start() {
        rl.setPrompt('명령하세요(종료하려면 "q"를 입력하세요) : ')
        rl.prompt()
        rl.on('line', async (command) => {
            if (command === 'q') rl.close();

            try {
                command = util.parseCommand(command)
                const keyCommand = util.getKeyCommand(command);
                util.checkArgsNumber(keyCommand, command);
                await controller[keyCommand](...command);
            }
            catch (e) {
                console.log(e)
                errorHandler.handleError(e.message)
            }
            finally {
                rl.prompt()
            }
        })
        rl.on('close', () => {
            process.exit()
        })
    }
}
app.start()