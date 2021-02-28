import { State, GameBoard, Direction, BoardValues } from "./models";
import {
  moveSnake,
  changeDirection,
  createElement,
  getRandomInt,
} from "./utils";
import "./styles";

const state: State = {
  width: 20,
  height: 30,
  snake: [
    [0, 4],
    [0, 5],
    [0, 6],
  ],
  isSnakeUnique: true,
  direction: Direction.DOWN,
  speed: 300,
  intervalHandle: null,
  food: [4, 3],
};

(window as any).state = state;

const initializeNodes = () => {
  const root = document.querySelector("#root");
  const container = createElement("div", "container");
  const gameBoard = createElement("div", "board");
  container.appendChild(gameBoard);
  root.appendChild(container);
  return {
    root,
    container,
    gameBoard,
  };
};

const Game = () => {
  const { container, gameBoard } = initializeNodes();

  const renderGame = () => {
    const { width, height, snake } = state;
    const boardMatrix: GameBoard = Array.from({ length: height }).map((v) => {
      const row = Array.from({ length: width }, () => 0);
      return row;
    });

    snakeFindsFood();

    snake.forEach((bit) => {
      const [y, x] = bit;
      boardMatrix[y][x] = BoardValues.Snake;
    });
    {
      const [y, x] = state.food;
      boardMatrix[y][x] = BoardValues.Food;
    }
    if (hasSnakeCollisions()) {
      snake.forEach((bit) => {
        const [y, x] = bit;
        boardMatrix[y][x] = BoardValues.DeadSnake;
      });
      renderBoard(boardMatrix);
      stopGame();
      return;
    }
    renderBoard(boardMatrix);
  };

  const hasSnakeCollisions = () => {
    if (state.isSnakeUnique === false) {
      return false;
    }
    let result = false;
    state.snake.forEach((segment, idx) => {
      const found = state.snake
        .slice(idx + 1)
        .find(([Y, X]) => Y === segment[0] && X === segment[1]);
      if (found) {
        result = true;
      }
    });
    return result;
  };

  const snakeFindsFood = () => {
    const { food, snake } = state;
    const [foodY, foodX] = food;
    const [snakeHeadY, snakeHeadX] = snake[0];
    if (snakeHeadY === foodY && snakeHeadX === foodX) {
      switch (state.direction) {
        case Direction.UP: {
          snake.unshift([snakeHeadY - 1, snakeHeadX]);
          break;
        }
        case Direction.DOWN: {
          snake.unshift([snakeHeadY + 1, snakeHeadX]);
          break;
        }
        case Direction.LEFT: {
          snake.unshift([snakeHeadY, snakeHeadX - 1]);
          break;
        }
        case Direction.RIGHT: {
          snake.unshift([snakeHeadY, snakeHeadX + 1]);
          break;
        }
      }
      dropNewFood();
      accelerate();
    }
  };

  const accelerate = () => {
    const subtractMls = Math.floor((20 * state.speed) / 100);
    const newSpeed = state.speed - subtractMls;
    if (newSpeed <= 50) {
      state.speed = 50;
    } else {
      state.speed = newSpeed;
    }
    clearInterval(state.intervalHandle);
    runGame();
  };

  const dropNewFood = () => {
    const y = getRandomInt(0, state.height - 1);
    const x = getRandomInt(0, state.width - 1);
    state.food = [y, x];
  };

  const renderBoard = (boardMatrix: GameBoard) => {
    gameBoard.innerHTML = null;
    boardMatrix.forEach((row) => {
      const outerDiv = createElement("div", "row");
      for (const cell of row) {
        const innerDiv = createElement("div");
        if (cell === BoardValues.Snake) {
          innerDiv.classList.add("snake");
        }
        if (cell === BoardValues.Food) {
          innerDiv.classList.add("food");
        }

        if (cell === BoardValues.DeadSnake) {
          innerDiv.classList.add("dead");
        }

        outerDiv.appendChild(innerDiv);
      }
      gameBoard.appendChild(outerDiv);
    });
  };

  const runGame = () => {
    state.intervalHandle = global.setInterval(() => {
      const newSnake = moveSnake(state);

      state.snake = newSnake;
      state.isSnakeUnique = true;
      renderGame();
    }, state.speed);
  };

  const stopGame = () => {
    const gameOver = createElement("h2", "game-over");
    gameOver.textContent = "Game over";
    container.appendChild(gameOver);
    clearInterval(state.intervalHandle);
  };

  runGame();
  window.addEventListener("keydown", (e) => {
    const newDirection = changeDirection(e.code);
    state.direction = newDirection;
  });
};

export default Game;
