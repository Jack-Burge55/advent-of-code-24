const fs = require("fs");
let data;

try {
  data = fs
    .readFileSync("input.txt", "utf8")
    .split("\r\n")
    .map((line) => line.split(": "));
  data = data.map((line) => {
    const newArr = [];
    newArr.push(parseInt(line[0]));
    newArr.push(line[1].split(" ").map(Number));
    return newArr;
  });
} catch (err) {
  console.error("Error reading the file:", err);
}
// data in form [[ 190, [ 10, 19 ] ],[ 3267, [ 81, 40, 27 ] ],...]

const isValidTest = (array) => {
  const [sumToReach, numbers] = array;

  const recursive = (currentNumber, remainingArray) => {
    if (!remainingArray.length) return currentNumber === sumToReach;
    return (
      recursive(currentNumber + remainingArray[0], remainingArray.slice(1)) ||
      recursive(currentNumber * remainingArray[0], remainingArray.slice(1))
    );
  };

  const isValid = recursive(numbers[0], numbers.slice(1));
  return isValid ? sumToReach : 0;
};

const totalValidTestValues = data.reduce((arr, curr) => {
  return arr + isValidTest(curr);
}, 0);

console.log(totalValidTestValues);
// 6392012777720
