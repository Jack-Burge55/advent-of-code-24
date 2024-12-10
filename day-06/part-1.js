const { log } = require("console");
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

// Assume grid is a square, and assume no cyclic paths
const gridLength = grid.length;
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let currDirIndex = 0;
let runningCount = 0;
let endFound = false;

// Remove track tag as we now have coords
grid[coords[0]][coords[1]] = ".";

while (!endFound) {
  // first add current tile if not already tread
  if (grid[coords[0]][coords[1]] === ".") {
    runningCount++;
    grid[coords[0]][coords[1]] = "X";
  }
  // try to move
  // attempted coordinates
  const nextX = coords[0] + directions[currDirIndex][0];
  const nextY = coords[1] + directions[currDirIndex][1];
  if (nextX >= 0 && nextX < gridLength && nextY >= 0 && nextY < gridLength) {
    if (grid[nextX][nextY] !== "#") {
      coords[0] = nextX;
      coords[1] = nextY;
    } else {
      currDirIndex = (currDirIndex + 1) % 4;
    }
  } else {
    endFound = true;
  }
}

console.log(runningCount);
// 4722
