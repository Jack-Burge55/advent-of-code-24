const fs = require("fs");
let stones;

try {
  stones = fs.readFileSync("input.txt", "utf8").split(" ").map(Number);
} catch (err) {
  console.log("Error reading the file:", err);
}

let blinkCount = 25;

const blink = (stones) => {
  let newStones = [];
  stones.forEach((stone) => {
    if (stone === 0) newStones.push(1);
    if (stone.toString().length % 2 === 0) {
      stone = stone.toString();
      newStones.push(parseInt(stone.substring(0, stone.length / 2)));
      newStones.push(parseInt(stone.substring(stone.length / 2)));
    } else {
      const result = stone * 2024;
      if (result !== 0) newStones.push(result);
    }
  });
  return newStones;
};

const savedValues = new Map();

let runningTotal = 0;

const recursive = (stoneArray, depth) => {
  if (depth === 0) runningTotal += stoneArray.length;
  else {
    stoneArray.forEach((stone) => {
      if (savedValues.has(stone)) {
        stone = savedValues.get(stone);
      } else {
        const copy = stone;
        stone = [stone];
        for (let i = 0; i < blinkCount; i++) {
          stone = blink(stone);
        }
        savedValues.set(copy, stone);
      }
      recursive(stone, depth - 1);
    });
  }
};

recursive(stones, 3);

console.log(runningTotal);
// 216318908621637
