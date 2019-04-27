const ErrorHandler = function (controller, fontColor) {
    this.controller = controller;
    this.fontColor = fontColor;
    this.errorMessage = {
        commandCharError: '올바른 명령기호($)를 사용해 주세요.',
        noMatchedIdError: '일치하는 id가 없습니다.',
        showOptionError: 'show 명령의 옵션은 all/todo/doing/done 중 하나로 입력해 주세요.',
        updateOptionError: 'update 명령의 status는 todo/doing/done 중 하나로 입력해 주세요.',
        argsNumberError: '인자 개수를 확인해주세요.',
        wrongCommandError: '올바른 명령어를 사용해주세요.'
    }
}
ErrorHandler.prototype = {
    handleError(errorMessage) {
        if(!this.errorMessage[errorMessage]) this.printOtherErrors();
        if (errorMessage.length === 4) return this.printSameStatusError(errorMessage) //errorMsg가 id이면(4글자) SameStatusError
        return this.printErrorMessage(errorMessage)
    },
    printErrorMessage(errorMessage) {
        console.log(this.fontColor, this.errorMessage[errorMessage])
    },
    printSameStatusError(id) {
        const idx = this.controller.model.getIndex(id);
        const { name, status } = this.controller.model.todoList[idx];
        console.log(this.fontColor, `${name}의 status는 이미 ${status}입니다.`)
    }
}

module.exports = ErrorHandler;