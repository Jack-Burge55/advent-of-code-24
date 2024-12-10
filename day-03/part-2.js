const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8");
} catch (err) {
  console.error("Error reading the file:", err);
}

const regexp = /mul\(([1-9]|[1-9][0-9]|[1-9][0-9][0-9]),([1-9]|[1-9][0-9]|[1-9][0-9][0-9])\)|do\(\)|don't\(\)/g
let currentDo = true
const total = data.match(regexp).reduce((acc, cur) => {  
  if (["do()", "don't()"].includes(cur)) {
    currentDo = cur === "do()"
    return acc
  }
  else if (currentDo) {
    const [first, second] = cur.slice(4, -1).split(",").map(Number)  
  return acc + first * second
}
return acc
}, 0)
console.log(total);
// 82868252
