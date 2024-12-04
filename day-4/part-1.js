const fs = require("fs");
let data;

try {
  // get data in 140x140 array x array
  data = fs.readFileSync("input.txt", "utf8").split("\r\n").map(line => line.split(""));
} catch (err) {
  console.error("Error reading the file:", err);
}

let xmasCount = 0
const gridWidth = 140

const checkForWord = (word) => {
  if (word === "XMAS" || word === "SAMX") xmasCount++
}

for (let i = 0; i < gridWidth; i++) {
  for (let j = 0; j < gridWidth; j++) {
    // up-right diagonal case
    if (i >= 3 && j <= gridWidth - 4) {
      checkForWord(data[i][j] + data[i-1][j+1] + data[i-2][j+2] + data[i-3][j+3])
    }
    // right case
    if (j <= gridWidth - 4) {
      checkForWord(data[i][j] + data[i][j+1] + data[i][j+2] + data[i][j+3])
    }
    // down-right case
    if (i <= gridWidth - 4 && j <= gridWidth - 4) {
      checkForWord(data[i][j] + data[i+1][j+1] + data[i+2][j+2] + data[i+3][j+3])
    }
    // down case
    if (i <= gridWidth - 4) {
      checkForWord(data[i][j] + data[i+1][j] + data[i+2][j] + data[i+3][j])
    }
  }
}

console.log(xmasCount);
//2493
