const fs = require("fs");
let data, newData;
let runningTotal = 0;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
  newData = [];
  for (let i = 0; i < data.length; i = i + 4) {
    const first = data[i].split("X+")[1].split(", Y+").map(Number);
    const second = data[i + 1].split("X+")[1].split(", Y+").map(Number);
    const prize = data[i + 2].split("X=")[1].split(", Y=").map(Number);

    newData.push([
      first[0],
      first[1],
      second[0],
      second[1],
      prize[0],
      prize[1],
    ]);
  }
} catch (err) {
  console.log("File not found:", err);
}

const calculateTokens = (ax, ay, bx, by, px, py) => {
  let [aCount, bCount] = [0, 0];
  const checkStatus = () => {
    const xUnder = aCount * ax + bCount * bx < px;
    const yUnder = aCount * ay + bCount * by < py;

    const equals =
      aCount * ax + bCount * bx === px && aCount * ay + bCount * by === py;
    if (equals) return "equals";
    if (xUnder && yUnder) return "below";
    if (!xUnder && !yUnder) return "over";
    return "mix";
  };
  const costFn = () => aCount * 3 + bCount * 1;
  let cost = 0;

  // first get as many B's to equal or go over
  while (checkStatus() !== "over" && bCount < 100) bCount++;  
  // save cost if all B's suffices
  if (checkStatus() === "equals") cost = bCount;
  // reduce B's adding A's to see if equal
  let found = false
  while (!found && bCount && aCount < 100) {    
    const result = checkStatus()
    if (result === "equals") {
      cost = costFn()
      found = true
    }
    if (result === "over" || result === "mix") bCount--
    if (result === "below") {
      while (checkStatus() === "below") aCount++
    }    
  }
  // no B's left
  while (checkStatus() === "below") aCount++;
  if (checkStatus() === "equals") cost = Math.min(cost, costFn());  
  return cost;
};

newData.forEach((machine) => {
  runningTotal += calculateTokens(...machine);
});

console.log(newData, runningTotal);
//34787
