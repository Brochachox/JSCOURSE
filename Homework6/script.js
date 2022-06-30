


class Game {
    #playerFlag = 1;
    #stateArray = [];
    #isComplete = false;
    #output;
    constructor(output, fieldSize = 3) {
        this.fieldSize = fieldSize;
        //this.#output = output;
        this.#output = new output(fieldSize);
        this.#output.printMessage(`Player ${this.#playerFlag} turn:`);
        for (let i = 0; i <= fieldSize - 1; i++) {
            this.#stateArray[i] = [];
            for (let j = 0; j <= fieldSize - 1; j++) {
                this.#stateArray[i][j] = +0;
            }
        }
    }
    isValidCell(x, y) {
        if ((x <= this.fieldSize - 1) && (y <= this.fieldSize - 1) && (this.#stateArray[x][y] === 0)) {
            return true;
        }
    }
    changeState(x, y) {
        if (this.isValidCell(x, y) && !this.#isComplete) {
            this.#stateArray[x][y] = this.#playerFlag;
            this.#output.printField(this.#stateArray);
            if (this.checkWin(x, y) === 'win') {
                this.#output.printMessage(`Player ${this.#playerFlag} win`);
                this.#isComplete = true;
                this.#output.showRestartButton();
                return;
            }
            else if (this.checkWin(x, y) === 'draw') {
                this.#output.printMessage(`draw`);
                this.#isComplete = true;
                this.#output.showRestartButton();
                return;
            }

            this.changePlayer();
            this.#output.printMessage(`Player ${this.#playerFlag} turn:`);

        } else if (this.#isComplete) {

            this.#output.printMessage('The game is over!\nClick reset button');
        } else {
            this.#output.printMessage('Choice other cell');
        }

    }
    changePlayer() {
        this.#playerFlag = 1 + (this.#playerFlag % 2);


    }
    checkWin(x, y) {
        if (this.fieldSize - 1 - x === y) {
            for (let i = 0; i < this.fieldSize; i++) {
                if (this.#stateArray[this.fieldSize - 1 - i][i] !== this.#playerFlag) {
                    break;
                }
                if (i == this.fieldSize - 1) {
                    return 'win';
                }
            }
        }
        if (x === y) {
            for (let i = 0; i < this.fieldSize; i++) {
                if (this.#stateArray[i][i] !== this.#playerFlag) {
                    break;
                }
                if (i == this.fieldSize - 1) {
                    return 'win';
                }
            }
        }
        for (let i = 0; i < this.fieldSize; i++) {
            if (this.#stateArray[i][y] !== this.#playerFlag) {
                break;
            }
            if (i == this.fieldSize - 1) {
                return 'win';
            }
        }
        for (let i = 0; i < this.fieldSize; i++) {
            if (this.#stateArray[x][i] !== this.#playerFlag) {
                break;
            }
            if (i == this.fieldSize - 1) {
                return 'win';
            }
        }
        if (!this.#stateArray.flat().includes(0)) {
            return 'draw';
        }
    }
    destroy() {
        this.#output.destroy();
    }
}



// class ConsoleOutput {
//     #signs = ['', 'x', 'o'];
//     constructor() {

//     }
//     printMessage(str) {
//         console.log(str);
//     }
//     printField(field) {
//         field.forEach(element => {
//             element.forEach(element => {
//                 process.stdout.write(this.#signs[element] + ' ');
//             });
//             process.stdout.write("\n");
//         });
//     }
// }

class HtmlOutput {
    #field;
    #textOutput;
    #signs = ['', 'cross', 'zero'];
    constructor(fieldSize = 3) {
        this.#textOutput = document.querySelector(".text-output");
        this.#field = document.querySelector(".field");
        this.#field.className = "";
        this.#field.classList.add('field');
        this.#field.classList.add(`field-${fieldSize}-grids`);
        for (let i = 0; i <= fieldSize - 1; i++) {
            for (let j = 0; j <= fieldSize - 1; j++) {
                this.#field.insertAdjacentHTML('beforeend', `<div class="cell"  pos="${i}-${j}"></div>`);
            }
        }
    }
    printField(gameField) {
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField[i].length; j++) {
                if (gameField[i][j] === 0 || (document.querySelector(`.cell[pos="${i}-${j}"]`).classList.contains(this.#signs[gameField[i][j]]))) {
                    continue;
                }
                document.querySelector(`.cell[pos="${i}-${j}"]`).classList.add(this.#signs[gameField[i][j]]);
            }
        }
    }
    printMessage(str) {
        this.#textOutput.innerHTML = str;
    }
    showRestartButton() {
        document.querySelector(".reset").classList.remove("invisisble");
    }
    destroy() {
        this.#field.innerHTML = '';
    }
}
class Input {
    #game;
    #fieldSize;
    constructor() {
        document.querySelector('.settings').addEventListener('click', function () {
            if (!document.querySelector('.settings-overlay').classList.contains('settings-overlay-visible')) {
                document.querySelector('.settings-icon').classList.add('settings-icons-rotate');
                document.querySelector('.settings-overlay').classList.add('settings-overlay-visible');
            } else {
                document.querySelector('.settings-overlay').classList.remove('settings-overlay-visible');
                document.querySelector('.settings-icon').classList.remove('settings-icons-rotate');
            }
        });
        document.querySelector('.field-size-settings').addEventListener('change', (e) => {
            this.#fieldSize = +e.target.value;
            this.restart();
            document.querySelector('.settings-overlay').classList.remove('settings-overlay-visible');
            document.querySelector('.settings-icon').classList.remove('settings-icons-rotate');
        })
    }
    startGame() {
        this.#game = new Game(HtmlOutput, this.#fieldSize);
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', this.addSymbol
            )
        })
        document.querySelector(".reset").addEventListener('click', this.restart);
    }
    addSymbol = (e) => {
        let arr = e.target.getAttribute("pos").split('-');
        this.#game.changeState(+arr[0], +arr[1]);
    }
    restart = () => {
        this.#game.destroy();
        document.querySelector(".reset").classList.add('invisisble');
        this.startGame();
    }
}




let input = new Input();
input.startGame(3);
