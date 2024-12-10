const fs = require("fs");
let data;

try {
  // get data in 140x140 array x array
  data = fs
    .readFileSync("input.txt", "utf8")
    .split("\r\n")
    .map((line) => line.split(""));
} catch (err) {
  console.error("Error reading the file:", err);
}

let xmasCount = 0;
const gridWidth = 140;

const checkForWord = (word) => {
  if (["MMASS", "MSAMS", "SSAMM", "SMASM"].includes(word)) xmasCount++;
};

for (let i = 1; i < gridWidth - 1; i++) {
  for (let j = 1; j < gridWidth - 1; j++) {
    if (data[i][j] === "A") {
      checkForWord(
        data[i - 1][j - 1] +
          data[i - 1][j + 1] +
          data[i][j] +
          data[i + 1][j - 1] +
          data[i + 1][j + 1]
      );
    }
  }
}

console.log(xmasCount);
//1890
