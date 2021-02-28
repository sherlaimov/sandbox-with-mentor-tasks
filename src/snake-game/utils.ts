import { Direction, ActiveKeyCodes, State, Snake } from "./models";

export const createElement = (type: string, className?: string) => {
  const element = document.createElement(type);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

export const moveSnake = (state: State) => {
  const { direction, snake, width, height } = state;

  let newSnake: Snake = [...snake];

  for (let i = newSnake.length - 2; i >= 0; i--) {
    newSnake[i + 1] = [...newSnake[i]];
  }

  switch (direction) {
    case Direction.UP: {
      const [y] = newSnake[0];
      newSnake[0][0] = y === 0 ? height - 1 : y - 1;
      return newSnake;
    }

    case Direction.DOWN: {
      const [y] = newSnake[0];
      newSnake[0][0] = y === height - 1 ? 0 : y + 1;
      return newSnake;
    }

    case Direction.LEFT: {
      const [, x] = newSnake[0];
      newSnake[0][1] = x === 0 ? width - 1 : x - 1;
      return newSnake;
    }

    case Direction.RIGHT: {
      const [, x] = newSnake[0];
      newSnake[0][1] = x === width - 1 ? 0 : x + 1;
      return newSnake;
    }
  }
};

export const changeDirection = (code: string) => {
  switch (code) {
    case ActiveKeyCodes.ArrowUp:
      return Direction.UP;
    case ActiveKeyCodes.ArrowDown:
      return Direction.DOWN;
    case ActiveKeyCodes.ArrowLeft:
      return Direction.LEFT;
    case ActiveKeyCodes.ArrowRight:
      return Direction.RIGHT;
  }
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
