const fs = require("fs");
let data;

try {
  // get data in 140x140 array x array
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

const checkAndAddInvalidUpdate = (update) => {
  let l = 0;
  let r = 1;
  let wasInvalid = false;

  while (l < update.length - 1) {
    if (rulesMap.get(update[l]).has(update[r])) {
      wasInvalid = true;
      const temp = update[r];
      update[r] = update[l];
      update[l] = temp;
    }
    if (r === update.length - 1) {
      l++;
      r = l + 1;
    } else {
      r++;
    }
  }
  if (wasInvalid) {
    runningTotal += update[Math.floor(update.length / 2)];
  }
};

const updatesArray = data
  .slice(splitIndex + 1)
  .map((update) => update.split(",").map(Number));
let runningTotal = 0;
updatesArray.forEach((update) => {
  checkAndAddInvalidUpdate(update);
});

console.log("runningTotal:", runningTotal);
//4598
