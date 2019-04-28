class Util {
    parseCommand(command) {
        if (command === 'undo' || command === 'redo') return [command];
        if (!/\$/.test(command)) throw Error('commandCharError')
        return command.split('$');
    }

    getKeyCommand(command) {
        const KeyMap = {
            show: 'showData',
            add: 'addData',
            delete: 'deleteData',
            update: 'updateData',
            undo: 'undo',
            redo: 'redo'
        }
        const keyCommand = command.shift();
        if (!KeyMap[keyCommand]) throw Error('wrongCommandError');
        return KeyMap[keyCommand]
    }

    checkArgsNumber(keyCommand, restCommand) {
        const argsNumber = {
            showData: 1,
            addData: 2,
            deleteData: 1,
            updateData: 2,
            undo: 0,
            redo: 0
        }
        if (argsNumber[keyCommand] !== restCommand.length) throw Error('argsNumberError');
    }
}

module.exports = Util;