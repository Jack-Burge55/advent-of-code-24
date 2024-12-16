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
let minCost = Infinity;
let tilesMap = new Map();

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

const validAndCheaperTile = (tile, cost) => {
  const mapSavedCost = tilesMap.get(`${tile[0]},${tile[1]}`);
  if (tile[0] === end[0] && tile[1] === end[1]) {
    // end found
    if (cost < minCost) minCost = cost;
    return false;
  }
  return (
    data[tile[0]][tile[1]] !== "#" &&
    (mapSavedCost === undefined || mapSavedCost > cost)
  );
};

// in heads we store the coords, the current cost and the direction faced
heads.push([start, 0, "e"]);
tilesMap.set(`${start[0]},${start[1]}`, 0);
while (heads.length > 0) {
  const newHeads = [];
  heads.forEach((head) => {
    // e.g. [ [ 13, 1 ], 0, 'e' ]
    const [loc, cost, dir] = head;
    // get direct and 2 side directions
    const coordInd = coordList.findIndex((element) => element === dir);
    const [left, right] = [
      coordList[mod(coordInd - 1, 4)],
      coordList[mod(coordInd + 1, 4)],
    ];
    // straight ahead
    const next = [loc[0] + coords[dir][0], loc[1] + coords[dir][1]];
    const updatedCost = cost + 1;
    if (validAndCheaperTile(next, updatedCost)) {
      tilesMap.set(`${next[0]},${next[1]}`, updatedCost);
      newHeads.push([next, updatedCost, dir]);
    }
    // left
    const leftDir = [loc[0] + coords[left][0], loc[1] + coords[left][1]];
    const updatedTurnCost = cost + 1001;
    if (validAndCheaperTile(leftDir, updatedTurnCost)) {
      tilesMap.set(`${leftDir[0]},${leftDir[1]}`, updatedTurnCost);
      newHeads.push([leftDir, updatedTurnCost, left]);
    }
    // right
    const rightDir = [loc[0] + coords[right][0], loc[1] + coords[right][1]];
    if (validAndCheaperTile(rightDir, updatedTurnCost)) {
      tilesMap.set(`${rightDir[0]},${rightDir[1]}`, updatedTurnCost);
      newHeads.push([rightDir, updatedTurnCost, right]);
    }
  });
  heads = newHeads;
}

console.log(minCost);
// 88416
