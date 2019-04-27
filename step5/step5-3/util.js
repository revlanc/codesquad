const Util = function () { }
Util.prototype = {
    parseCommand(command) {
        if (!/\$/.test(command)) throw Error('commandCharError')
        return command.split('$');
    },
    getKeyCommand(command) {
        const KeyMap = {
            show: 'showData',
            add: 'addData',
            delete: 'deleteData',
            update: 'updateData',
            undo: 'undo', //추가
            redo: 'redo' //추가
        }
        const keyCommand = command.shift();
        if(!KeyMap[keyCommand]) throw Error('wrongCommandError');
        return KeyMap[keyCommand]
    },
    checkArgsNumber(keyCommand, restCommand) {
        const argsNumber = {
            showData: 1,
            addData: 2,
            deleteData: 1,
            updateData: 2,
            undo: 1,
            redo: 1
        }
        if (argsNumber[keyCommand] !== restCommand.length) throw Error('argsNumberError');
    }
}

module.exports = Util;