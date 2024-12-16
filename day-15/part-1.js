const fs = require("fs");
let data;
let grid = [];
let directions = [];
let position;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n\r\n");
  grid = data[0].split("\r\n").map((line) => line.split(""));
  grid.forEach((row, i) => {
    row.forEach((colItem, j) => {
      if (colItem === "@") position = [i, j];
    });
  });
  directions = data[1].split("\r\n").join("").split("");
} catch (err) {
  console.log("Error reading file:", err);
}

const attemptMove = (dir) => {
  let origin = [position[0], position[1]];
  let newLocation = [position[0] + dir[0], position[1] + dir[1]];
  // clear space
  if (grid[newLocation[0]][newLocation[1]] === ".") {
    grid[position[0]][position[1]] = ".";
    grid[newLocation[0]][newLocation[1]] = "@";
    position = newLocation;
  }
  //
  else {
    while (grid[newLocation[0]][newLocation[1]] === "O") {
      newLocation = [newLocation[0] + dir[0], newLocation[1] + dir[1]];
    }
    // if we eventually reach a clear space
    if (grid[newLocation[0]][newLocation[1]] === ".") {
      // move boxes
      grid[origin[0]][origin[1]] = ".";
      grid[origin[0] + dir[0]][origin[1] + dir[1]] = "@";
      grid[newLocation[0]][newLocation[1]] = "O";
      position = [origin[0] + dir[0], origin[1] + dir[1]];
    }
  }
};

directions.forEach((direction) => {
  switch (direction) {
    case "^":
      attemptMove([-1, 0]);
      break;
    case ">":
      attemptMove([0, 1]);
      break;
    case "v":
      attemptMove([1, 0]);
      break;
    case "<":
      attemptMove([0, -1]);
      break;
    default:
      break;
  }
});

// score grid
let runningTotal = 0;
grid.forEach((row, i) => {
  row.forEach((colItem, j) => {
    if (colItem === "O") {
      runningTotal += 100 * i + j;
    }
  });
});
// just for fun
console.log(grid.join("\n"));
console.log(runningTotal);
// 1415498
