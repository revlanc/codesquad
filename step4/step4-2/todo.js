const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const todos = {
    todolists: []
}

todos.generateID = () => ((1 + Math.random()) * 0x10000 | 0).toString(15).substring(1)

todos.getParsedCommand = (command, char) => command = command.split(char)

todos.countStatus = (list, statusType) => list.filter(v => v.status === statusType).length

todos.getAllStatus = function (list) {
    const counts = {
        todo: this.countStatus(list, 'todo'),
        doing: this.countStatus(list, 'doing'),
        done: this.countStatus(list, 'done')
    }
    const str = '현재상태 : ' + Object.entries(counts).map(([key, value]) => `${key}: ${value}개`).join(', ')
    return str
}

todos.getStatusByType = function (list, statusType) {
    const counts = this.countStatus(list, statusType)
    const str = `${statusType}리스트 :  총 ${counts}건 : ` + list.filter(v => v.status === statusType).map(v => `'${v.name}, ${v.id}번'`).join(', ')
    return str
}

todos.show = function (statusType) {
    const statusOptions = {
        all: this.getAllStatus(this.todolists),
        todo: this.getStatusByType(this.todolists, statusType),
        doing: this.getStatusByType(this.todolists, statusType),
        done: this.getStatusByType(this.todolists, statusType)
    }
    console.log(statusOptions[statusType])
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

const start = () => {
    rl.setPrompt('명령어를 입력해주세요 : ')
    rl.prompt()
    rl.on('line', (command) => {
        if (command === 'quit' || command === 'q') rl.close()
        command = todos.getParsedCommand(command, '$')
        const commandType = command.shift()
        todos[commandType](...command)
        rl.prompt()
    })
    rl.on('close', () => {
        process.exit()
    })
}

start()