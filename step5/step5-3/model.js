class Model {
    constructor(initialData, MAX_HISTORY_CAPACITY) {
        this.todoList = initialData;
        this.MAX_HISTORY_CAPACITY = MAX_HISTORY_CAPACITY;
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
        this.saveHistory('deleteData', [id]);
        return newData;
    }

    deleteData(id) {
        const targetIndex = this.getIndex(id);
        const targetData = this.todoList[targetIndex];
        const [targetTags] = targetData.tags
        this.saveHistory('addData', [targetData.name, targetTags, id, targetData.status]);
        this.todoList.splice(targetIndex, 1);
        return targetData;
    }

    updateData(id, status) {
        const targetIndex = this.getIndex(id);
        let targetData = this.todoList[targetIndex];
        if (targetData.status === status) throw Error(id);
        this.saveHistory('updateData', [id, targetData.status]);
        targetData.status = status;
        return targetData;
    }

    makeId() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
    }

    getCount(status) {
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
        if (this.historyStack.length >= this.MAX_HISTORY_CAPACITY) this.historyStack.shift();
        this.historyStack.push({ keyCommand, keyData })
    }

    //keyCommand = string  //keyData = array
    undo() {
        if (this.historyStack.length === 0) throw Error('emptyStackError');
        const previousData = this.historyStack.pop();
        const { keyCommand, keyData } = previousData;
        const recoveredData = this.getRecoveredData(keyCommand, keyData);
        this.saveDataForRedo();
        return { keyCommand, recoveredData };
    }
    
    redo() {
        if (this.redoStack.length === 0) throw Error('emptyStackError')
        const { keyCommand, keyData } = this.redoStack.pop();
        const recoveredData = this.getRecoveredData(keyCommand, keyData);
        return { keyCommand, recoveredData };
    }
    
    getRecoveredData(keyCommand, keyData) {
        return this[keyCommand](...keyData);
    }

    saveDataForRedo () {
        this.redoStack.push(this.historyStack.pop());
    }
}

module.exports = Model;