const fs = require("fs");
let data;
let grid = [];
let directions = [];
let position;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n\r\n");
  grid = data[0].split("\r\n").map((line) => {
    line = line.split("");
    return line.flatMap((char) => {
      switch (char) {
        case "#":
          return ["#", "#"];
        case "O":
          return ["[", "]"];
        case ".":
          return [".", "."];
        case "@":
          return ["@", "."];
        default:
          break;
      }
    });
  });
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
  } else {
    // collide with boxes or wall
    const boxSet = new Set();
    let ableToPush = true;
    const recursive = (loc, dir) => {
      // check loc for new box to add to boxSet, then check next layer
      if (grid[loc[0]][loc[1]] === "#") {
        ableToPush = false;
      }
      if (grid[loc[0]][loc[1]] === "[") {
        boxSet.add(`${loc[0]},${loc[1]}`);
        recursive([loc[0] + dir[0], loc[1] + dir[1]], dir);
        recursive([loc[0] + dir[0], loc[1] + 1 + dir[1]], dir);
      }
      if (grid[loc[0]][loc[1]] === "]") {
        boxSet.add(`${loc[0]},${loc[1] - 1}`);
        recursive([loc[0] + dir[0], loc[1] + dir[1]], dir);
        recursive([loc[0] + dir[0], loc[1] - 1 + dir[1]], dir);
      }
    };

    if (dir[1] !== 0) {
      // left or right case which has different behaviour
      while (["[", "]"].includes(grid[newLocation[0]][newLocation[1]])) {
        if (grid[newLocation[0]][newLocation[1]] === "[") {
          boxSet.add(`${newLocation[0]},${newLocation[1]}`);
        }
        newLocation = [newLocation[0] + dir[0], newLocation[1] + dir[1]];
      }
      // if we eventually reach a clear space
      if (grid[newLocation[0]][newLocation[1]] === ".") {
        grid[origin[0]][origin[1]] = ".";
        grid[origin[0] + dir[0]][origin[1] + dir[1]] = "@";
        position = [origin[0] + dir[0], origin[1] + dir[1]];

        boxSet.forEach((leftBox) => {
          const [row, col] = leftBox.split(",").map(Number);
          grid[row + dir[0]][col + dir[1]] = "[";
          grid[row + dir[0]][col + dir[1] + 1] = "]";
        });
      }
    } else {
      // up or down movement is a little more complicated due to multiple boxes being able to be pushed by one box
      // we add boxes to push layer by layer, as well as store them in the boxSet
      recursive(newLocation, dir);
      if (ableToPush) {
        boxSet.forEach((leftBox) => {
          const [row, col] = leftBox.split(",").map(Number);
          grid[row][col] = ".";
          grid[row][col + 1] = ".";
        });
        boxSet.forEach((leftBox) => {
          const [row, col] = leftBox.split(",").map(Number);
          grid[row + dir[0]][col + dir[1]] = "[";
          grid[row + dir[0]][col + 1 + dir[1]] = "]";
        });
        grid[origin[0]][origin[1]] = ".";
        grid[origin[0] + dir[0]][origin[1] + dir[1]] = "@";
        position = [origin[0] + dir[0], origin[1] + dir[1]];
      }
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
    if (colItem === "[") {
      runningTotal += 100 * i + j;
    }
  });
});
// // just for fun
fs.writeFileSync("endGrid", grid.join("\n"));
console.log(runningTotal);
// 1432898
