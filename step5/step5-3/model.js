const Model = function (initialData, maxHistoryCapacity) {
    this.todoList = initialData;
    this.maxHistoryCapacity = maxHistoryCapacity;
    this.historyStack = [];
    this.redoStack = [];
}
Model.prototype = {
    getId(key, value) {
        const targetData = this.todoList.filter(todoData => todoData[key] === value).shift();
        return targetData.id;
    },
    addData(name, tags, id) {
        const newData = {
            name,
            tags: tags.replace(/\[|\]|\"|\'/g, '').split(','),
            status: 'todo',
            id: id
        }
        this.todoList.push(newData);
        this.saveHistory('deleteData', [newData.id]);
        return newData;
    },
    deleteData(id) {
        const targetIndex = this.getIndex(id);
        const targetData = this.todoList[targetIndex];
        const [targetTags] = targetData.tags
        this.saveHistory('addData', [targetData.name, targetTags, targetData.id]);
        this.todoList.splice(targetIndex, 1);
        return targetData;
    },
    updateData(id, status) {
        const targetIndex = this.getIndex(id);
        let targetData = this.todoList[targetIndex];
        if (targetData.status === status) throw Error(id);
        this.saveHistory('updateData', [targetData.id, targetData.status]);
        targetData.status = status;
        return targetData;
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
    //recentData = object
    saveHistory(keyCommand, keyData) {
        if (this.historyStack.length >= this.maxHistoryCapacity) this.historyStack.shift();
        this.historyStack.push({ keyCommand, keyData })
        console.log(this.historyStack)
    },
    //keyCommand = string  //keyData = array
    undoData() {
        if(this.historyStack.length === 0) return console.log('emptyStack')
        const {keyCommand, keyData} = this.historyStack.pop();
        this[keyCommand](...keyData)
        this.historyStack.pop()
        return ;
    },
    redoData() {
        console.log(this.todoList, 'q', this.historyStack)
    }
}

module.exports = Model;