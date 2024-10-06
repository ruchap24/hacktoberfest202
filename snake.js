const gameBoard = document.getElementById('game-board');
const boardSize = 20; // 20x20 grid
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
let direction = { x: 0, y: 0 };
let speed = 200;

function createBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const box = document.createElement('div');
            if (snake.some(segment => segment.x === j && segment.y === i)) {
                box.classList.add('snake');
            }
            if (food.x === j && food.y === i) {
                box.classList.add('food');
            }
            gameBoard.appendChild(box);
        }
    }
}

function updateSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize || snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        alert('Game Over!');
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 38: // Up arrow
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 39: // Right arrow
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
        case 40: // Down arrow
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
    }
}

function gameLoop() {
    updateSnake();
    createBoard();
    setTimeout(gameLoop, speed);
}

window.addEventListener('keydown', changeDirection);
gameLoop();
