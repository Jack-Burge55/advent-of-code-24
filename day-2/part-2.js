// const fs = require("fs");
// let data;

// try {
//   data = fs.readFileSync("input.txt", "utf8").split("\r\n");
// } catch (err) {
//   console.error("Error reading the file:", err);
// }
// const reports = data.map((line) => line.split(" ").map(Number));

// const checkIncreasing = (report) => {
//   let increaseCount = 0
//   for (let i = 0; i < 5; i++) {
//     for (let j = 0; j < 5; j++) {
//       if (i < j && report[i] < report[j]) increaseCount++
//     }
//   }
//   return increaseCount > 10
// }

// // each report is at least 5 in length
// const safeCount = reports.filter(report => {
//   if (report.length === 1) return true
//   const isIncreasing = checkIncreasing(report)
//   let l = 0
//   let r = 1
//   let dampenerAvailable = true
//   while (r < report.length - 1) {
//     const curr = report[l]
//     const next = report[r]
//     if (isIncreasing && next <= curr || !isIncreasing && next >= curr || Math.abs(next - curr) >= 4) {
//       if (!dampenerAvailable) {
//         return false
//       }
//         dampenerAvailable = false
//     }
//     else {
//       l = r
//     }
//     r++
//   }
//   return true
// }).length

// console.log(safeCount);

const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
} catch (err) {
  console.error("Error reading the file:", err);
}
const reports = data.map((line) => line.split(" ").map(Number));

const validReport = (report) => {
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
}

const safeCount = reports.filter(report => {
  if (validReport(report)) return true
  let indexToRemove = 0
  let validFound = false
  while (indexToRemove < report.length && !validFound) {
    const newReport = report.slice(0, indexToRemove).concat(report.slice(indexToRemove + 1))
    if (validReport(newReport)) validFound = true
    indexToRemove++
  }
  return validFound
}).length

console.log(safeCount);
// 296
