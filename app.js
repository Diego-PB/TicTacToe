const board = document.getElementById('board');
const blocks = [];
const players = ['X', 'O'];
let currentPlayer = randomPlayerStart();

document.querySelector('.turn').textContent = `Player ${players[currentPlayer]}'s turn`;
function randomPlayerStart() {
    let pfCurrentPlayer = Math.floor(Math.random() * 2);
    console.log('the number of the player is : ' + pfCurrentPlayer);
    
    return pfCurrentPlayer;
}

// Create blocks
for (let i = 0; i < 9; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.addEventListener('click', addMove);
    board.appendChild(block);
    blocks.push(block);
}

function addMove(e) {
    const block = e.target;
    if (block.textContent === '') {
        block.textContent = players[currentPlayer];
        currentPlayer = (currentPlayer + 1) % players.length;
        checkWin();
    }
    document.querySelector('.turn').textContent = `Player ${players[currentPlayer]}'s turn`;
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (blocks[a].textContent && blocks[a].textContent === blocks[b].textContent && blocks[a].textContent === blocks[c].textContent) {
            alert(`Player ${blocks[a].textContent} wins!`);
            resetGame();
            break;
        }
    }

    function resetGame() {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].textContent = '';
        }
        currentPlayer = randomPlayerStart();
        document.querySelector('.turn').textContent = `Player ${players[currentPlayer]}'s turn`;
        return currentPlayer;
    }
    // if the class restart is clicked, the game will reset and 'currentPlayer = randomPlayerStart();' will be called
    document.querySelector('.restart').addEventListener('click', resetGame);
    

}