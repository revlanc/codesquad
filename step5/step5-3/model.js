class Model {
    constructor (initialData, maxHistoryCapacity) {
        this.todoList = initialData;
        this.maxHistoryCapacity = maxHistoryCapacity;
        this.historyStack = [];
        this.redoStack = [];
    }
        getId(key, value) {
        const targetData = this.todoList.filter(todoData => todoData[key] === value).shift();
        return targetData.id;
    }

    addData(name, tags, id, status = 'todo') {
        const newData = {
            name,
            tags: tags.replace(/\[|\]|\"|\'/g, '').split(','),
            status: status,
            id: id
        }
        this.todoList.push(newData);
        this.saveHistory('deleteData', [newData.id]);
        return newData;
    }

    deleteData(id) {
        const targetIndex = this.getIndex(id);
        const targetData = this.todoList[targetIndex];
        const [targetTags] = targetData.tags
        this.saveHistory('addData', [targetData.name, targetTags, targetData.id, targetData.status]);
        this.todoList.splice(targetIndex, 1);
        return targetData;
    }

    updateData(id, status) {
        const targetIndex = this.getIndex(id);
        let targetData = this.todoList[targetIndex];
        if (targetData.status === status) throw Error(id);
        this.saveHistory('updateData', [targetData.id, targetData.status]);
        targetData.status = status;
        return targetData;
    }

    makeId() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
    }

    countData(status) {
        return this.getMatchedData(status).length
    }

    getMatchedData(status) {
        return this.todoList.filter(todoData => todoData.status === status)
    }

    getIndex(id) {
        const idx = this.todoList.findIndex(el => el.id === id)
        if (idx === -1) throw Error('noMatchedIdError')
        return idx
    }

    //keyData = object
    saveHistory(keyCommand, keyData) {
        if (this.historyStack.length >= this.maxHistoryCapacity) this.historyStack.shift();
        this.historyStack.push({ keyCommand, keyData })
    }

    //keyCommand = string  //keyData = array
    undoData() {
        if (this.historyStack.length === 0) throw Error('emptyStackError');
        const previousData = this.historyStack.pop();
        const { keyCommand, keyData } = previousData;
        const newData = this[keyCommand](...keyData);
        this.redoStack.push(this.historyStack.pop());
        return { keyCommand, newData };
    }

    redoData() {
        if (this.redoStack.length === 0) throw Error('emptyStackError')
        const { keyCommand, keyData } = this.redoStack.pop();
        const newData = this[keyCommand](...keyData);
        return { keyCommand, newData };
    }
}

module.exports = Model;