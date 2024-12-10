const fs = require("fs");
let data;
let runningTotal = 0;

try {
  data = fs
    .readFileSync("input.txt", "utf-8")
    .split("\r\n")
    .map((line) => line.split("").map(Number));
} catch (err) {
  console.log("Can't find file:", err);
}

// assume square grid
const dataWidth = data[0].length;

const trailsFromHere = (i, j) => {
  let headsStack = [`${i},${j},0`];
  let ends = new Set();
  while (headsStack.length > 0) {
    const arrowSplit = headsStack[0].split("->");
    const [x, y, alt] = arrowSplit[arrowSplit.length - 1]
      .split(",")
      .map(Number);

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        // up, down, left & right
        if (i !== j && i * j === 0) {
          if (data[x + i] && data[x + i][y + j] === alt + 1) {
            if (alt + 1 === 9)
              ends.add(`${headsStack[0]}->${x + i},${y + j},${alt + 1}`);
            else {
              headsStack.push(`${headsStack[0]}->${x + i},${y + j},${alt + 1}`);
            }
          }
        }
      }
    }
    headsStack = headsStack.slice(1);
  }
  return ends.size;
};

for (let i = 0; i < dataWidth; i++) {
  for (let j = 0; j < dataWidth; j++) {
    if (data[i][j] === 0) {
      runningTotal += trailsFromHere(i, j);
    }
  }
}

console.log(runningTotal);
// 717
