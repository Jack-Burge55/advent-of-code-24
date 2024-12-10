const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8");
} catch (err) {
  console.error("Error reading the file:", err);
}

const regexp = /mul\(([1-9]|[1-9][0-9]|[1-9][0-9][0-9]),([1-9]|[1-9][0-9]|[1-9][0-9][0-9])\)/g
const total = data.match(regexp).reduce((acc, cur) => {
  const [first, second] = cur.slice(4, -1).split(",").map(Number)  
  return acc + first * second
}, 0)
console.log(total);
// 170778545
