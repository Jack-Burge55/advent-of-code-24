const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
} catch (err) {
  console.error("Error reading the file:", err);
}
const firstList = [];
const secondList = [];

data.forEach((line) => {
  const [first, second] = line.split("   ").map(Number);
  firstList.push(first);
  secondList.push(second);
});

firstList.sort((a, b) => a - b);
secondList.sort((a, b) => a - b);

const totalDifference = firstList.reduce((acc, cur, index) => {
  return acc + Math.abs(cur - secondList[index]);
}, 0);

console.log(totalDifference);
//1603498
