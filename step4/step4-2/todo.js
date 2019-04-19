const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const generateID = () => {

}

const getParsedCommand = (command, char) => {
    command = command.split(char)
    return command
}

const start = () => {
    rl.setPrompt('명령어를 입력해주세요 :')
    rl.prompt()
    rl.on('line', (command) => {
        rl.prompt()
    })
    rl.on('close', () => {
        process.exit()
    })
}

const todos = {
    todolists =[]
}

todos.show = () => {

}

todos.add = () => {

}

todos.delete = () => {

}

todos.update = () => {

}

start()