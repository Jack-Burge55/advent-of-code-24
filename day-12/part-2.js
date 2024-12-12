const fs = require("fs");
let data;

try {
  data = fs
    .readFileSync("input.txt", "utf-8")
    .split("\r\n")
    .map((line) => line.split(""));
} catch (err) {
  console.log("Can't read file:", err);
}

// assume grid is a square
const gridlength = data[0].length;
let runningTotal = 0;
let currentId = 0;

const numberOfCorners = (squareSet) => {
  let runningTotal = 0;
  squareSet.forEach((tile) => {
    const [i, j] = tile.split(",").map(Number);
    const abovePresent = squareSet.has(`${i - 1},${j}`);
    const topRightPresent = squareSet.has(`${i - 1},${j + 1}`);
    const rightPresent = squareSet.has(`${i},${j + 1}`);
    const bottomRightPresent = squareSet.has(`${i + 1},${j + 1}`);
    const bottomPresent = squareSet.has(`${i + 1},${j}`);
    const bottomLeftPresent = squareSet.has(`${i + 1},${j - 1}`);
    const leftPresent = squareSet.has(`${i},${j - 1}`);
    const topLeftPresent = squareSet.has(`${i - 1},${j - 1}`);
    if (
      (abovePresent && leftPresent && !topLeftPresent) ||
      (!abovePresent && !leftPresent)
    )
      runningTotal++;
    if (
      (abovePresent && rightPresent && !topRightPresent) ||
      (!abovePresent && !rightPresent)
    )
      runningTotal++;
    if (
      (bottomPresent && rightPresent && !bottomRightPresent) ||
      (!bottomPresent && !rightPresent)
    )
      runningTotal++;
    if (
      (bottomPresent && leftPresent && !bottomLeftPresent) ||
      (!bottomPresent && !leftPresent)
    )
      runningTotal++;
  });
  return runningTotal;
};

const addRegionCost = (i, j) => {
  let area = 0;
  let tilesToAdd = new Set([`${i},${j}`]);
  const regionLetter = data[i][j];
  let totalTiles = new Set();

  while (tilesToAdd.size > 0) {
    const newTiles = new Set();
    tilesToAdd.forEach((tile) => {
      totalTiles.add(tile);
      area++;
      const [i, j] = tile.split(",").map(Number);

      data[i][j] = currentId;
      // left
      if (j - 1 >= 0 && data[i][j - 1] === regionLetter) {
        newTiles.add(`${i},${j - 1}`);
      }
      // right
      if (j + 1 < gridlength && data[i][j + 1] === regionLetter) {
        newTiles.add(`${i},${j + 1}`);
        data[i][j] = currentId;
      }
      // up
      if (i - 1 >= 0 && data[i - 1][j] === regionLetter) {
        newTiles.add(`${i - 1},${j}`);
        data[i][j] = currentId;
      }
      // down
      if (i + 1 < gridlength && data[i + 1][j] === regionLetter) {
        newTiles.add(`${i + 1},${j}`);
        data[i][j] = currentId;
      }
    });
    tilesToAdd = newTiles;
  }
  currentId++;

  // number of edges is the same as number of corners
  return area * numberOfCorners(totalTiles);
};

for (let i = 0; i < gridlength; i++) {
  for (let j = 0; j < gridlength; j++) {
    if (!Number.isInteger(data[i][j])) {
      runningTotal += addRegionCost(i, j);
    }
  }
}

console.log(runningTotal);
//908042
