const fs = require("fs");
let data;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
} catch (err) {
  console.error("Error reading the file:", err);
}

const splitIndex = data.findIndex((e) => e === "");
const rulesArray = data
  .slice(0, splitIndex)
  .map((rule) => rule.split("|").map(Number));
const rulesMap = new Map();
// if rule is [29, 34] we save this as 34 -> 29 to show restriction
rulesArray.forEach((rule) => {
  rulesMap.set(rule[1], (rulesMap.get(rule[1]) || new Set()).add(rule[0]));
});

const checkAndAddValidUpdate = (update) => {
  let l = 0;
  let validUpdate = true;

  while (l < update.length - 1) {
    update.slice(l + 1).forEach((element) => {
      if (rulesMap.get(update[l]).has(element)) validUpdate = false;
    });
    l++;
  }
  if (validUpdate) {
    runningTotal += update[Math.floor(update.length / 2)];
  }
};

const updatesArray = data
  .slice(splitIndex + 1)
  .map((update) => update.split(",").map(Number));
let runningTotal = 0;
updatesArray.forEach((update) => {
  checkAndAddValidUpdate(update);
});

console.log("runningTotal:", runningTotal);
//5452
