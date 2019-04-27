const View = function (fontColor) {
    this.fontColor = fontColor;
}
View.prototype = {
    showAll(countResult) {
        console.log(this.fontColor, '현재상태 : ' + Object.entries(countResult).map(([key, value]) => `${key}: ${value}개`).join(', '))
    },
    showEachData(status, countNumber, targetData) {
        const str = targetData.map(el => `'${el.name}, ${el.id}번'`).join(', ')
        console.log(this.fontColor, `${status}리스트 : 총 ${countNumber}건 : ${str}`)
    },
    //changedData = object
    showAddResult(changedData) {
        const { name, id } = changedData;
        console.log(this.fontColor, `${name} 1개가 추가되었습니다. (id : ${id})`)
    },
    showDeleteResult(changedData) {
        const { name, status } = changedData;
        console.log(this.fontColor, `${name} ${status}가 목록에서 삭제되었습니다.`)
    },
    showUpdateResult(changedData) {
        const { name, status } = changedData;
        console.log(this.fontColor, `${name}이(가) ${status}으로 상태가 변경되었습니다.`)
    },
    showUndoResult(changedData) {

        console.log('취소됨')
        //delete를 undo하면 'id, name가 삭제에서 status로 변경'
        //add를 undo하면 'id, name가 삭제되었습니다'
        //update를 undo하면 'id, name가 status2에서 status1으로 변경'
    },
    showRedoResult() {
        console.log('redo됨')
    }
}

module.exports = View;