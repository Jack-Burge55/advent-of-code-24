const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
} catch (err) {
  console.error("Error reading the file:", err);
}
const firstList = [];
const secondFrequency = new Map();

data.forEach((line) => {
  const [first, second] = line.split("   ").map(Number);
  firstList.push(first);
  secondFrequency.set(second, (secondFrequency.get(second) || 0) + 1);
});

const similarity = firstList.reduce((acc, curr) => {
  return acc + curr * (secondFrequency.get(curr) || 0);
}, 0);

console.log(similarity);
// 25574739
