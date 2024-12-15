const fs = require("fs");
let data;
let gridHeight = 103;
let gridWidth = 101;

try {
  data = fs
    .readFileSync("input.txt", "utf8")
    .split("\r\n")
    .map((element) => {
      element = element.split("v=");
      return [
        element[0].split("p=")[1].split(",").map(Number),
        element[1].split(",").map(Number),
      ];
    });
} catch (err) {
  console.log("Error reading file:", err);
}

const mod = (number, mod) => {
  return ((number % mod) + mod) % mod;
};

const picture = (grid) => {
  grid = grid.map(e => e.join(""))
  return grid
}

let notFound = true
let index = 0
while (notFound) {
  const bareGrid = new Array(gridHeight)
  for (let i = 0; i < gridHeight; i++) {
    bareGrid[i] = new Array(gridWidth).fill(".")
  }
  data.forEach((robot) => {
    const finalPosition = [
      mod(robot[0][0] + index * robot[1][0], gridWidth),
      mod(robot[0][1] + index * robot[1][1], gridHeight),
    ];    
    bareGrid[finalPosition[1]][finalPosition[0]] = "*"
  });
  const newGrid = picture(bareGrid).join("\n")
  if (newGrid.includes("********************")) {
    notFound = false
    fs.writeFileSync(`./days/Day ${index}`, picture(bareGrid).join("\n"))
  }
  console.log("Day", index, "checked");
  index++
}

// 6620