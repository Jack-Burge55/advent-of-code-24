const fs = require("fs");
let data;
let formattedData = [];
let currentId = 0;

try {
  data = fs.readFileSync("./input.txt", "utf-8");
  let isFile = true;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i]; j++) {
      if (isFile) {
        formattedData.push(currentId);
      } else {
        formattedData.push(".");
      }
    }
    if (isFile) currentId++;
    isFile = !isFile;
  }
} catch (err) {
  console.log("Document not found:", err);
}

// data in format [0,0,'.',...]
let [l, r] = [0, formattedData.length - 1];
while (l < r) {
  if (formattedData[l] === "." && formattedData[r] !== ".") {
    const temp = formattedData[l];
    formattedData[l] = formattedData[r];
    formattedData[r] = temp;
  }
  if (formattedData[l] !== ".") l++;
  if (formattedData[r] === ".") r--;
}

// data in format [0,0,9,..,'.',...]
let runningTotal = 0;
let i = 0;
while (formattedData[i] !== ".") {
  runningTotal += i * formattedData[i];
  i++;
}

console.log(runningTotal);
// 6211348208140
