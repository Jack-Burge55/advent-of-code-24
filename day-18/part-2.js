const fs = require("fs");
let data;
let gridLength = 71;
const start = [0, 0];
const end = [gridLength - 1, gridLength - 1];
const coords = {
  n: [-1, 0],
  e: [0, 1],
  s: [1, 0],
  w: [0, -1],
};
const coordList = ["n", "e", "s", "w"];
let grid = new Array(gridLength).fill([]);
grid = grid.map((_) => new Array(gridLength).fill("."));
let counter = 1024;

const mod = (number, mod) => ((number % mod) + mod) % mod;

try {
  data = fs
    .readFileSync("input.txt", "utf8")
    .split("\r\n")
    .map((byte) => byte.split(",").map(Number));
} catch (err) {
  console.log("Error reading file:", err);
}

// add initial obstacles
for (let i = 0; i < 1024; i++) {
  grid[data[i][1]][data[i][0]] = "#";
}

let pathExists = true;
let heads = [];
let bestArrayPath = [];
let tilesMap = new Map();
let minSteps = Infinity;
let blockingByte;

while (pathExists) {
  // add next obstacle
  grid[data[counter][1]][data[counter][0]] = "#";

  // only find new best path if starting or new byte in best path
  if (
    bestArrayPath.length === 0 ||
    bestArrayPath.includes(`${data[counter][1]},${data[counter][0]}`)
  ) {
    // reset variables and find new best path
    heads = [];
    bestArrayPath = [];
    tilesMap = new Map();
    minSteps = Infinity;

    const validAndCheaperTile = (tile, steps, arrayPath) => {
      const mapSavedSteps = tilesMap.get(`${tile[0]},${tile[1]}`);
      if (tile[0] === end[0] && tile[1] === end[1]) {
        // end found
        if (steps <= minSteps) {
          minSteps = steps;
          bestArrayPath = arrayPath;
        }
        return false;
      }
      return (
        0 <= tile[0] &&
        tile[0] < gridLength &&
        0 <= tile[1] &&
        tile[1] < gridLength &&
        grid[tile[0]][tile[1]] !== "#" &&
        (mapSavedSteps === undefined || mapSavedSteps > steps)
      );
    };

    heads.push([start, "e", [`${start[0]},${start[1]}`], 0]);
    tilesMap.set(`${start[0]},${start[1]}`, 0);
    while (heads.length > 0) {
      const newHeads = [];
      heads.forEach((head) => {
        // e.g. [ [ 13, 1 ], 'e', [array of tiles contained in path], steps]
        const [loc, dir, pathArray, steps] = head;
        // get direct and 2 side directions
        const coordInd = coordList.findIndex((element) => element === dir);
        const [left, right] = [
          coordList[mod(coordInd - 1, 4)],
          coordList[mod(coordInd + 1, 4)],
        ];
        // straight ahead
        const next = [loc[0] + coords[dir][0], loc[1] + coords[dir][1]];
        const forwardArray = [...pathArray, `${next[0]},${next[1]}`];
        if (validAndCheaperTile(next, steps + 1, forwardArray)) {
          tilesMap.set(`${next[0]},${next[1]}`, steps + 1);
          newHeads.push([next, dir, forwardArray, steps + 1]);
        }
        // left
        const leftDir = [loc[0] + coords[left][0], loc[1] + coords[left][1]];
        const leftArray = [...pathArray, `${leftDir[0]},${leftDir[1]}`];
        if (validAndCheaperTile(leftDir, steps + 1, leftArray)) {
          tilesMap.set(`${leftDir[0]},${leftDir[1]}`, steps + 1);
          newHeads.push([leftDir, left, leftArray, steps + 1]);
        }
        // right
        const rightDir = [loc[0] + coords[right][0], loc[1] + coords[right][1]];
        const rightArray = [...pathArray, `${rightDir[0]},${rightDir[1]}`];
        if (validAndCheaperTile(rightDir, steps + 1, rightArray)) {
          tilesMap.set(`${rightDir[0]},${rightDir[1]}`, steps + 1);
          newHeads.push([rightDir, right, rightArray, steps + 1]);
        }
      });
      // check for no path
      if (newHeads.length === 0 && bestArrayPath.length === 0) {
        pathExists = false;
        blockingByte = data[counter];
      }
      heads = newHeads;
    }
  }

  counter++;
}

console.log(counter - 1, blockingByte);
// 24,30
