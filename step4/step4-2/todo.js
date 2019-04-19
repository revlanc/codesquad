const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const todos = {
    todolists: [],

    generateID() { return ((1 + Math.random()) * 0x10000 | 0).toString(15).substring(1) },

    getParsedCommand(command, char) { return command = command.split(char) },

    countStatus(list, statusType) { return list.filter(v => v.status === statusType).length },

    getAllStatus(list) {
        const counts = {
            todo: this.countStatus(list, 'todo'),
            doing: this.countStatus(list, 'doing'),
            done: this.countStatus(list, 'done')
        }
        const str = '현재상태 : ' + Object.entries(counts).map(([key, value]) => `${key}: ${value}개`).join(', ')
        return str
    },

    getStatusByType(list, statusType) {
        const counts = this.countStatus(list, statusType)
        const str = `${statusType}리스트 :  총 ${counts}건 : ` + list.filter(v => v.status === statusType).map(v => `'${v.name}, ${v.id}번'`).join(', ')
        return str
    },

    show(statusType) {
        const statusOptions = {
            all: this.getAllStatus(this.todolists),
            todo: this.getStatusByType(this.todolists, statusType),
            doing: this.getStatusByType(this.todolists, statusType),
            done: this.getStatusByType(this.todolists, statusType)
        }
        console.log(statusOptions[statusType])
        rl.prompt()
    },

    add(name, tags) {
        const id = this.generateID()
        tags = tags.replace(/\[|\]|\"|\'/g, '').split(',')
        this.todolists.push(
            {
                id,
                name,
                tags,
                status: 'todo'
            }
        )
        const str = `${name} 1개가 추가됐습니다.(id : ${id})`
        console.log(str)
        setTimeout(() => this.show('all'), 1000)
    },

    delete(id) {
        const index = this.todolists.findIndex(v => v.id === id)
        const {
            name,
            status
        } = this.todolists[index]
        this.todolists.splice(index, 1)
        const str = `${name} ${status}가 목록에서 삭제되었습니다.`
        console.log(str)
        setTimeout(() => this.show('all'), 1000)
    },

    update() {
        console.log('done')

    }
}

const start = () => {
    rl.setPrompt('명령어를 입력해주세요 : ')
    rl.prompt()
    rl.on('line', (command) => {
        if (command === 'quit' || command === 'q') rl.close()
        command = todos.getParsedCommand(command, '$')
        const commandType = command.shift()
        todos[commandType](...command)
    })
    rl.on('close', () => {
        process.exit()
    })
}

start()