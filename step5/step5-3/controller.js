const Controller = function (model, view) {
    this.model = model
    this.view = view
}
Controller.prototype = {
    showAll() {
        const countResult = {
            todo: this.model.countData('todo'),
            doing: this.model.countData('doing'),
            done: this.model.countData('done')
        }
        this.view.showAll(countResult)
    },
    showEachData(status) {
        const countNumber = this.model.countData(status)
        const targetData = this.model.getMatchedData(status)
        this.view.showEachData(status, countNumber, targetData)
    },
    showData(type) {
        if (type === 'all') { return this.showAll() }
        if (!/^(todo|doing|done)$/.test(type)) throw Error('ShowTypeError')
        this.showEachData(type)
    },
    addData(name, tags) {
        const id = this.model.makeId()
        const changedData = this.model.addData(name, tags, id);
        this.view.showAddResult(changedData);
        this.showFinalResult();
    },
    deleteData(id) {
        const changedData = this.model.deleteData(id)
        this.view.showDeleteResult(changedData);
        this.showFinalResult();
    },
    updateData(id, status) {
        if (!/^(todo|doing|done)$/.test(status)) throw Error('UpdateStatusError')
        const changedData = this.model.updateData(id, status);
        setTimeout(() => {
            this.view.showUpdateResult(changedData);
            this.showFinalResult();
        }, 3000);
    },
    showFinalResult() {
        setTimeout(() => { this.showAll() }, 1000);
    },
    undo() {
        const changedData = this.model.undoData();
        this.view.showUndoResult(changedData);
    },
    redo() { //추가
        this.model.redoData();
        this.view.showRedoResult();
    }
}

module.exports = Controller;