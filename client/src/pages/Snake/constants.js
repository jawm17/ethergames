const CANVAS_SIZE = [1000, 670];
const SNAKE_START = [
  [13, 7],
  [13, 8]
];
const APPLE_START = [8, 3];
const SCALE = 30;
const SPEED = 70;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};
