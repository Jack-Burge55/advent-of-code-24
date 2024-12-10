const fs = require("fs");
let data;
let formattedData = [];
let currentId = 0;

try {
  data = fs.readFileSync("./input.txt", "utf-8");
  let isFile = true;
  for (let i = 0; i < data.length; i++) {
    if (isFile) {
      formattedData.push([currentId, parseInt(data[i])]);
      currentId++;
    } else {
      data[i] > 0 && formattedData.push([".", parseInt(data[i])]);
    }
    isFile = !isFile;
  }
} catch (err) {
  console.log("Document not found:", err);
}

let r = formattedData.length - 1;
while (r > 0) {
  if (formattedData[r][0] !== ".") {
    let l = 0;
    let swapFound = false;
    while (l < r && !swapFound) {
      if (
        formattedData[l][1] >= formattedData[r][1] &&
        formattedData[l][0] === "."
      ) {
        const value = formattedData[r][0];
        formattedData[r][0] = ".";
        // insert value that many times to replace .'s on l, leaving excess .'s
        if (formattedData[l][1] === formattedData[r][1]) {
          formattedData[l][0] = value;
        } else {
          // split .'s e.g. l = [".", 3] & r = [9, 2]
          formattedData[l][0] = value;
          const diff = formattedData[l][1] - formattedData[r][1];
          formattedData[l][1] = formattedData[r][1];
          formattedData = formattedData
            .slice(0, l + 1)
            .concat([[".", diff]])
            .concat(formattedData.slice(l + 1));
          r++;
        }
        swapFound = true;
      } else l++;
    }
  }
  r--;
}

//[[0,2],[9,2],...,['.',2]]
let id = 0;
const checksum = formattedData.reduce((acc, cur) => {
  let thisTotal = 0;
  for (let i = 0; i < cur[1]; i++) {
    if (cur[0] !== ".") thisTotal += cur[0] * id;
    id++;
  }
  return acc + thisTotal;
}, 0);

console.log(checksum);
// 6239783302560
