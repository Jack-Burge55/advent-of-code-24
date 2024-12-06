const fs = require("fs");
let grid;
let coords;

try {
  // get grid in 130 length array x array format
  grid = fs
    .readFileSync("input.txt", "utf8")
    .split("\r\n")
    .map((line, firstIndex) => {
      const splitRow = line.split("");
      splitRow.forEach((element, secondIndex) => {
        if (element === "^") coords = [firstIndex, secondIndex];
      });
      return splitRow;
    });
} catch (err) {
  console.error("Error reading the file:", err);
}

// Assume grid is a square
const gridLength = grid.length;
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let currDirIndex = 0;
let loopsCount = new Set();
let endFound = false;

// Remove track tag as we now have coords
grid[coords[0]][coords[1]] = "X";

const getsLoop = (grid, startX, startY, obstacleX, obstacleY) => {
  // we track when the mover hits an obstacle, and from where. If it happens twice we have a loop
  const visited = new Set();
  let x = startX;
  let y = startY;
  let dir = currDirIndex;
  let loopfound = false;
  while (true) {
    const key = `${x},${y},${dir}`;
    if (visited.has(key)) {
      loopfound = true;
      break;
    }
    visited.add(key);
    // try to move
    // attempted coordinates
    const nextX = x + directions[dir][0];
    const nextY = y + directions[dir][1];

    if (
      nextX >= 0 &&
      nextX < gridLength &&
      nextY >= 0 &&
      nextY < gridLength &&
      !(nextX === obstacleX && nextY === obstacleY) &&
      grid[nextX][nextY] !== "#"
    ) {
      x = nextX;
      y = nextY;
    } else {
      dir = (dir + 1) % 4;
      if (
        nextX < 0 ||
        nextX >= gridLength ||
        nextY < 0 ||
        nextY >= gridLength
      ) {
        break;
      }
    }
  }
  if (loopfound) loopsCount.add(`${obstacleX}-${obstacleY}`);
};

while (!endFound) {
  if (grid[coords[0]][coords[1]] === ".") {
    grid[coords[0]][coords[1]] = "X";
  }
  // try to move
  // attempted coordinates
  const nextX = coords[0] + directions[currDirIndex][0];
  const nextY = coords[1] + directions[currDirIndex][1];

  if (nextX >= 0 && nextX < gridLength && nextY >= 0 && nextY < gridLength) {
    if (grid[nextX][nextY] !== "#") {
      // perform loop test here
      if (grid[nextX][nextY] === ".") {
        getsLoop(grid, coords[0], coords[1], nextX, nextY);
      }
      // then proceed as normal
      coords[0] = nextX;
      coords[1] = nextY;
    } else {
      currDirIndex = (currDirIndex + 1) % 4;
    }
  } else {
    endFound = true;
  }
}

console.log(loopsCount.size);
// 1602
