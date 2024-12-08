const fs = require("fs");
let data;
let antennaMap = new Map();
let dataWidth;
let antinodeSet = new Set();

try {
  data = fs
    .readFileSync("input.txt", "utf8")
    .split("\r\n")
    .map((line) => line.split(""));
  // assume square
  dataWidth = data[0].length;
  data.forEach((line, index) => {
    line.forEach((element, jndex) => {
      if (element !== ".") {
        antennaMap.set(
          element,
          (antennaMap.get(element) || []).concat([[index, jndex]])
        );
      }
    });
  });
} catch (err) {
  console.error("Error reading the file:", err);
}

antennaMap.forEach((antennaLine) => {
  for (let i = 0; i < antennaLine.length; i++) {
    for (let j = i + 1; j < antennaLine.length; j++) {
      // e.g. antennaLine[i] = [1, 8], antennaLine[j] = [2, 5]
      const iToJ = [
        antennaLine[j][0] - antennaLine[i][0],
        antennaLine[j][1] - antennaLine[i][1],
      ];
      const jPlus = [antennaLine[j][0] + iToJ[0], antennaLine[j][1] + iToJ[1]];
      const iMinus = [antennaLine[i][0] - iToJ[0], antennaLine[i][1] - iToJ[1]];
      // check in boundaries then add if valid
      if (
        0 <= jPlus[0] &&
        jPlus[0] < dataWidth &&
        0 <= jPlus[1] &&
        jPlus[1] < dataWidth
      )
        antinodeSet.add(`${jPlus[0]},${jPlus[1]}`);
      // check in boundaries then add if valid
      if (
        0 <= iMinus[0] &&
        iMinus[0] < dataWidth &&
        0 <= iMinus[1] &&
        iMinus[1] < dataWidth
      )
        antinodeSet.add(`${iMinus[0]},${iMinus[1]}`);
    }
  }
});

console.log(antinodeSet.size);
// 269
