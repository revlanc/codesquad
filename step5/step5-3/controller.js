class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    showAll() {
        const countResult = {
            todo: this.model.countData('todo'),
            doing: this.model.countData('doing'),
            done: this.model.countData('done')
        }
        this.view.showAll(countResult)
    }

    showEachData(status) {
        const countNumber = this.model.countData(status)
        const targetData = this.model.getMatchedData(status)
        this.view.showEachData(status, countNumber, targetData)
    }

    showData(type) {
        if (type === 'all') { return this.showAll() }
        if (!/^(todo|doing|done)$/.test(type)) throw Error('showOptionError')
        this.showEachData(type)
    }

    async addData(name, tags) {
        const id = this.model.makeId()
        const changedData = this.model.addData(name, tags, id);
        this.view.showResult('addData', changedData);
        await this.makeDelay(1);
        this.showAll();
    }

    async deleteData(id) {
        const changedData = this.model.deleteData(id)
        this.view.showResult('deleteData', changedData);
        await this.makeDelay(1);
        this.showAll();
    }

    async updateData(id, status) {
        if (!/^(todo|doing|done)$/.test(status)) throw Error('updateOptionError')
        const changedData = this.model.updateData(id, status);
        await this.makeDelay(3);
        this.view.showResult('updateData', changedData);
        await this.makeDelay(1);
        this.showAll();
    }

    undo() {
        const data = this.model.undoData();
        this.view.showUndoRedoResult(data);
    }

    redo() {
        const data = this.model.redoData();
        this.view.showUndoRedoResult(data);
    }

    makeDelay(sec) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, sec * 1000);
        })
    }
}

module.exports = Controller;