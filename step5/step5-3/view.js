class View {
    constructor  (fontColor) {
        this.fontColor = fontColor;
    }
    
    showAll(countResult) {
        console.log(this.fontColor, '현재상태 : ' + Object.entries(countResult).map(([key, value]) => `${key}: ${value}개`).join(', '))
    }
    
    showEachData(status, countNumber, targetData) {
        const str = targetData.map(el => `'${el.name}, ${el.id}번'`).join(', ')
        console.log(this.fontColor, `${status}리스트 : 총 ${countNumber}건 : ${str}`)
    }
    
    showResult(keyCommand, changedData) {
        const { name, status, id } = changedData;
        const msgMap = {
            addData: `${name} 1개가 추가되었습니다. (id : ${id})`,
            deleteData: `${name} ${status}가 목록에서 삭제되었습니다.`,
            updateData: `${name}이(가) ${status}으로 상태가 변경되었습니다.`
        }
        console.log(this.fontColor, msgMap[keyCommand])
    }

    showUndoRedoResult(data) {
        const { keyCommand, recoveredData } = data;
        const { name, status, id } = recoveredData;
        const msgMap = {
            addData: `${id, name}가 삭제에서 ${status}로 변경되었습니다.`,
            deleteData: `${id, name}가 삭제되었습니다.`,
            updateData: `${id, name}가 ${status}로 상태가 변경되었습니다.`
        }
        console.log(this.fontColor, msgMap[keyCommand])
    }
}

module.exports = View;