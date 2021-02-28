export type GameBoard = Array<Array<number | string>>;
export type Snake = [number, number, string?][];

export type State = {
  width: number;
  height: number;
  snake: Snake;
  isSnakeUnique: boolean;
  direction: Direction;
  speed: number;
  intervalHandle: null | NodeJS.Timeout;
  food: number[];
};

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum ActiveKeyCodes {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}

export enum BoardValues {
  Snake = "o",
  Food = "f",
  DeadSnake = "d",
}
