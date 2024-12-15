const fs = require("fs")
let data
let gridHeight = 103
let gridWidth = 101
let secondsElapsed = 100
// tl, tr, bl, br
let quadrantArray = new Array(4).fill(0)

const mod = (number, mod) => {
  return ((number % mod) + mod) % mod
}

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n").map(element => {
    element = element.split("v=")    
    return [element[0].split("p=")[1].split(",").map(Number), element[1].split(",").map(Number)]
  })
} catch (err) {
  console.log("Error reading file:", err);  
}

data.forEach(robot => {
  const finalPosition = [mod(robot[0][0] + secondsElapsed * robot[1][0], gridWidth), mod(robot[0][1] + secondsElapsed * robot[1][1], gridHeight)]
  const isLeft = finalPosition[0] < Math.floor(gridWidth / 2)
  const isTop = finalPosition[1] < Math.floor(gridHeight / 2)
  const isRight = finalPosition[0] >= Math.ceil(gridWidth / 2)
  const isBottom = finalPosition[1] >= Math.ceil(gridHeight / 2)
  if (isLeft && isTop) quadrantArray[0]++
  if (isRight && isTop) quadrantArray[1]++
  if (isLeft && isBottom) quadrantArray[2]++
  if (isRight && isBottom) quadrantArray[3]++
})

const safetyFactor = quadrantArray.reduce((acc, cur) => {
  return acc * cur
}, 1)

console.log(safetyFactor);
// 233709840
