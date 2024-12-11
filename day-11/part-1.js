const fs = require("fs");
let stones;

try {
  stones = fs.readFileSync("input.txt", "utf8").split(" ").map(Number);
} catch (err) {
  console.log("Error reading the file:", err);
}

let blinkCount = 24;

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

for (let i = 0; i < blinkCount; i++) {
  stones = blink(stones);
}

console.log(stones.length);
// 182081
