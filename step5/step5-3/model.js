const Model = function (initialData) {
    this.todoList = initialData;
    this.historyStack = [];
    this.redoStack = [];
}
Model.prototype = {
    getId(key, value) {
        const targetData = this.todoList.filter(todoData => todoData[key] === value).shift();
        return targetData.id;
    },
    addData(name, tags) {
        tags = tags.replace(/\[|\]|\"|\'/g, '').split(',')
        const id = this.makeId()
        const todoData = {
            name,
            tags,
            status: 'todo',
            id
        }
        this.todoList.push(todoData)
    },
    deleteData(id) {
        const targetIndex = this.getIndex(id)
        this.todoList.splice(targetIndex, 1)
    },
    updateData(id, status) {
        const targetIndex = this.getIndex(id);
        let targetData = this.todoList[targetIndex];
        if (targetData.status === status) throw Error(id)
        targetData.status = status
    },
    makeId() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
    },
    countData(status) {
        return this.getMatchedData(status).length
    },
    getMatchedData(status) {
        return this.todoList.filter(todoData => todoData.status === status)
    },
    getIndex(id) {
        const idx = this.todoList.findIndex(el => el.id === id)
        if (idx === -1) throw Error('MatchedDataError')
        return idx
    },
    saveTodoList() {
    },
    undoData() {
    },
    redoData() {
        console.log(this.todoList, 'q', this.historyStack)
    }
}

module.exports = Model;