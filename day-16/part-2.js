const fs = require("fs");
let data;
let start;
let end;
let heads = [];
const coords = {
  n: [-1, 0],
  e: [0, 1],
  s: [1, 0],
  w: [0, -1],
};
const coordList = ["n", "e", "s", "w"];
let tilesMap = new Map();
let minCost = Infinity;
const bestPathSet = new Set();
const arraysToAdd = [];

const mod = (number, mod) => ((number % mod) + mod) % mod;

try {
  data = fs
    .readFileSync("input.txt", "utf-8")
    .split("\r\n")
    .map((line, row) => {
      line = line.split("");
      line.forEach((colItem, col) => {
        if (colItem === "S") start = [row, col];
        if (colItem === "E") end = [row, col];
      });
      return line;
    });
} catch (err) {
  console.log("error reading file:", err);
}

const validAndCheaperTile = (tile, cost, pathArray) => {
  const mapSavedCost = tilesMap.get(`${tile[0]},${tile[1]}`);
  if (tile[0] === end[0] && tile[1] === end[1]) {
    // end found
    if (cost <= minCost) {
      minCost = cost;
      arraysToAdd.push([pathArray, cost]);
    }
    return false;
  }
  return (
    data[tile[0]][tile[1]] !== "#" &&
    (mapSavedCost === undefined || mapSavedCost + 1000 >= cost)
  );
};

// in heads we store the coords, the current cost and the direction faced
heads.push([start, 0, "e", [`${start[0]},${start[1]}`]]);
tilesMap.set(`${start[0]},${start[1]}`, 0);
counter = 0;
while (heads.length > 0) {
  counter++;
  const newHeads = [];
  heads.forEach((head) => {
    // e.g. [ [ 13, 1 ], 0, 'e', [array of tiles contained in path] ]
    const [loc, cost, dir, pathArray] = head;
    // get direct and 2 side directions
    const coordInd = coordList.findIndex((element) => element === dir);
    const [left, right] = [
      coordList[mod(coordInd - 1, 4)],
      coordList[mod(coordInd + 1, 4)],
    ];
    // straight ahead
    const next = [loc[0] + coords[dir][0], loc[1] + coords[dir][1]];
    const forwardArray = [...pathArray, `${next[0]},${next[1]}`];
    const updatedCost = cost + 1;
    if (validAndCheaperTile(next, updatedCost, forwardArray)) {
      tilesMap.set(`${next[0]},${next[1]}`, updatedCost);
      newHeads.push([next, updatedCost, dir, forwardArray]);
    }
    // left
    const leftDir = [loc[0] + coords[left][0], loc[1] + coords[left][1]];
    const leftArray = [...pathArray, `${leftDir[0]},${leftDir[1]}`];
    const updatedTurnCost = cost + 1001;
    if (validAndCheaperTile(leftDir, updatedTurnCost, leftArray)) {
      tilesMap.set(`${leftDir[0]},${leftDir[1]}`, updatedTurnCost);
      newHeads.push([leftDir, updatedTurnCost, left, leftArray]);
    }
    // right
    const rightDir = [loc[0] + coords[right][0], loc[1] + coords[right][1]];
    const rightArray = [...pathArray, `${rightDir[0]},${rightDir[1]}`];
    if (validAndCheaperTile(rightDir, updatedTurnCost, rightArray)) {
      tilesMap.set(`${rightDir[0]},${rightDir[1]}`, updatedTurnCost);
      newHeads.push([rightDir, updatedTurnCost, right, rightArray]);
    }
  });

  heads = newHeads;
}

arraysToAdd.sort((a, b) => a[1] - b[1]);
const cheapestCost = arraysToAdd[0][1];
arraysToAdd.forEach((arr) => {
  if (arr[1] === cheapestCost) {
    arr[0].forEach((tile) => bestPathSet.add(tile));
  }
});

// just for fun showing possible travelled paths in grid
bestPathSet.forEach((tile) => {
  const [row, col] = tile.split(",");
  data[row][col] = "O";
});
fs.writeFileSync("endGrid", data.join("\n"));

console.log(bestPathSet.size);
// 442
