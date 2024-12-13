const fs = require("fs");
let data, newData;
let runningTotal = 0;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
  newData = [];
  for (let i = 0; i < data.length; i = i + 4) {
    const first = data[i].split("X+")[1].split(", Y+").map(Number);
    const second = data[i + 1].split("X+")[1].split(", Y+").map(Number);
    const prize = data[i + 2].split("X=")[1].split(", Y=").map(Number);

    newData.push([
      first[0],
      first[1],
      second[0],
      second[1],
      prize[0] + 10000000000000,
      prize[1] + 10000000000000,
    ]);
  }
} catch (err) {
  console.log("File not found:", err);
}

const invert22Matrix = (matrix) => {
  const [a, b, c, d] = [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1]];
  const det = a * d - b * c;

  if (!det) return null;
  return [
    [d / det, -b / det],
    [-c / det, a / det],
  ];
};

const calculateTokens = (ax, ay, bx, by, px, py) => {
  const invert = invert22Matrix([
    [ax, bx],
    [ay, by],
  ]);
  if (invert === null) return 0;
  const [a, b] = [
    invert[0][0] * px + invert[0][1] * py,
    invert[1][0] * px + invert[1][1] * py,
  ];
  // rounding negation
  if (
    Math.abs(a - Math.round(a)) < 0.001 &&
    Math.abs(b - Math.round(b)) < 0.001
  )
    return a * 3 + b;
  return 0;
};

newData.forEach((machine) => {
  runningTotal += calculateTokens(...machine);
});

console.log(runningTotal);
// 85644161121698
