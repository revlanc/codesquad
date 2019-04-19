const data = require('./data')

const countStatus = (status) => data.filter(obj => obj.status === status).length

const printStatus = () => {
    let counts = {
        'todo': countStatus('todo'),
        'doing': countStatus('doing'),
        'done': countStatus('done')
    }
    let str = '현재상태 : ' + Object.entries(counts).map(([key, value]) => `${key} : ${value}개`).join(', ')
    console.log(str)
}

const printListsByStatus = (status) => {
    let count = countStatus(status)
    let str = `${status}리스트 : 총 ${count}건 : ` + data.filter(obj => obj.status === status).map(x => x.name).join(', ')
    console.log(str)
}

const STATUS_OBJ = {
    'all': printStatus,
    'todo': printListsByStatus,
    'doing': printListsByStatus,
    'done': printListsByStatus
}

const show = (status) => {
    STATUS_OBJ[status](status)
}

show('all');
show('todo');
show('doing');
show('done');