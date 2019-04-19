const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const generateID = () => {
    return ((1 + Math.random()) * 0x10000 | 0).toString(15).substring(1)
}

const getParsedCommand = (command, char) => {
    command = command.split(char)
    return command
}

const start = () => {
    rl.setPrompt('명령어를 입력해주세요 : ')
    rl.prompt()
    rl.on('line', (command) => {
        if (command === 'quit' || command === 'q') rl.close()
        command = getParsedCommand(command, '$')
        const commandType = command.shift()
        todos[commandType]()
        rl.prompt()
    })
    rl.on('close', () => {
        process.exit()
    })
}

const todos = {
    todolists: []
}

todos.show = () => {
    console.log('done')
}

todos.add = () => {
    console.log('done')

}

todos.delete = () => {
    console.log('done')

}

todos.update = () => {
    console.log('done')

}

start()