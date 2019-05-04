let gridSize = 3;
let EMPTY = '';
let rows = [];
let turn = 'X';
let moves;


function init() {
    let board = document.createElement('table');
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('tr');
        board.appendChild(row);
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('td');
            cell.classList.add('col' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('corner0');
            }
            if (j == gridSize - i - 1) {
                cell.classList.add('corner1');
            }
            cell.addEventListener('click', set);
            row.appendChild(cell);
            rows.push(cell);
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

function startNewGame() {
    moves = 0;
    turn = 'X';
    rows.forEach((cell) => {
        cell.innerHTML = EMPTY;
    });
}

function win(clicked) {
    let memberOf = clicked.className.split(/\s+/);
    for (let i = 0; i < memberOf.length; i++) {
        let testClass = '.' + memberOf[i];
        let items = contains('#tictactoe ' + testClass, turn);
        if (items.length == gridSize) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    let filteredElements = [];
    let elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (text === element.textContent) {
            filteredElements.push(element)
        };
    })
    return filteredElements;
}

function computerMove(turn) {
    var emptyCells = [];
    var random;
    for (var i = 0; i < document.getElementById('tictactoe').getElementsByTagName("TD").length; i++) {
        if (document.getElementById('tictactoe').getElementsByTagName("TD")[i].textContent == '') {
            emptyCells.push(document.getElementById('tictactoe').getElementsByTagName("TD")[i]);
        }
    }
    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = turn;
}

function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    if (win(this)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    } else if (moves === gridSize * gridSize) {
        alert('Draw');
        startNewGame();
    } else {
        computerMove('O');
        moves += 1;
    }
}

init();