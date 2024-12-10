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
      let [jPlusX, jPlusY] = [antennaLine[j][0], antennaLine[j][1]]
      while (0 <= jPlusX && jPlusX < dataWidth && 0 <= jPlusY && jPlusY < dataWidth) {
        antinodeSet.add(`${jPlusX},${jPlusY}`)
        jPlusX += iToJ[0]
        jPlusY += iToJ[1]
      }
      let [iMinusX, iMinusY] = [antennaLine[i][0], antennaLine[i][1]]
      while (0 <= iMinusX && iMinusX < dataWidth && 0 <= iMinusY && iMinusY < dataWidth) {
        antinodeSet.add(`${iMinusX},${iMinusY}`)
        iMinusX -= iToJ[0]
        iMinusY -= iToJ[1]
      }
    }
  }
});

console.log(antinodeSet.size);
// 269
