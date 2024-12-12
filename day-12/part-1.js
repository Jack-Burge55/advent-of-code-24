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

const addRegionCost = (i, j) => {
  let area = 0;
  let perimeter = 0;
  let tilesToAdd = new Set([`${i},${j}`]);
  const regionLetter = data[i][j];

  while (tilesToAdd.size > 0) {
    const newTiles = new Set();
    tilesToAdd.forEach((tile) => {
      area++;
      const [i, j] = tile.split(",").map(Number);

      data[i][j] = currentId;
      // left
      if (j - 1 >= 0 && data[i][j - 1] === regionLetter) {
        newTiles.add(`${i},${j - 1}`);
      } else {
        if (
          j === 0 ||
          (data[i][j - 1] !== regionLetter && data[i][j - 1] !== currentId)
        )
          perimeter++;
      }
      // right
      if (j + 1 < gridlength && data[i][j + 1] === regionLetter) {
        newTiles.add(`${i},${j + 1}`);
        data[i][j] = currentId;
      } else {
        if (
          j === gridlength - 1 ||
          (data[i][j + 1] !== regionLetter && data[i][j + 1] !== currentId)
        )
          perimeter++;
      }
      // up
      if (i - 1 >= 0 && data[i - 1][j] === regionLetter) {
        newTiles.add(`${i - 1},${j}`);
        data[i][j] = currentId;
      } else {
        if (
          i === 0 ||
          (data[i - 1][j] !== regionLetter && data[i - 1][j] !== currentId)
        )
          perimeter++;
      }
      // down
      if (i + 1 < gridlength && data[i + 1][j] === regionLetter) {
        newTiles.add(`${i + 1},${j}`);
        data[i][j] = currentId;
      } else {
        if (
          i === gridlength - 1 ||
          (data[i + 1][j] !== regionLetter && data[i + 1][j] !== currentId)
        )
          perimeter++;
      }
    });
    tilesToAdd = newTiles;
  }
  currentId++;
  return area * perimeter;
};

for (let i = 0; i < gridlength; i++) {
  for (let j = 0; j < gridlength; j++) {
    if (!Number.isInteger(data[i][j])) {
      runningTotal += addRegionCost(i, j);
    }
  }
}

console.log(runningTotal);
//1449902
