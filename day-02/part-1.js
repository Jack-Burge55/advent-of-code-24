const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
} catch (err) {
  console.error("Error reading the file:", err);
}
const reports = data.map((line) => line.split(" ").map(Number));

const safeCount = reports.filter(report => {
  if (report.length === 1) return true
  const isIncreasing = report[1] > report[0]
  let index = 0
  while (index < report.length - 1) {
    const curr = report[index]
    const next = report[index + 1]
    if (isIncreasing && next <= curr) return false
    if (!isIncreasing && next >= curr) return false
    if (Math.abs(next - curr) >= 4) return false
    index++
  }
  return true
}).length

console.log(safeCount);
// 220
