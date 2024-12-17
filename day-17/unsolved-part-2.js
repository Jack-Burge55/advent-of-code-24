const fs = require("fs");
let data;
let a, b, c;
let program;
let output = "";
let pointer = 0;

try {
  data = fs.readFileSync("input.txt", "utf8").split("\r\n");
  a = parseInt(data[0].split("A: ")[1]);
  b = parseInt(data[1].split("B: ")[1]);
  c = parseInt(data[2].split("C: ")[1]);
  program = data[4].split(": ")[1].split(",").map(Number);
} catch (err) {
  console.log("Error reading file:", err);
}

const comboCalc = (num) => {
  if (num <= 3) return num;
  if (num === 4) return a;
  if (num === 5) return b;
  if (num === 6) return c;
  return null;
};

const dv = (combo, char) => {
  const res = Math.floor(a / 2 ** combo);
  if (char === "a") a = res;
  if (char === "b") b = res;
  if (char === "c") c = res;
};

const bxl = (literal) => {
  b = b ^ literal;
};

const bst = (combo) => {
  b = ((combo % 8) + 8) % 8;
};

const jnz = (literal) => {
  if (a !== 0) {
    // - 2 offsets the stepwise +2 pointer
    pointer = literal - 2;
  }
};

const bxc = () => {
  b = b ^ c;
};

const out = (combo) => {
  combo = ((combo % 8) + 8) % 8;
  if (output.length === 0) {
    output = combo.toString();
  } else {
    output = output + `,${combo}`;
  }
  return output == program;
};

let runningA = 11111111111636;
let lowestFound = false;
while (!lowestFound) {
  console.log(runningA, output);
  
  a = runningA
  b = 0;
  c = 0;
  pointer = 0;
  output = "";
  let result = false;

  while (pointer < program.length) {
    const opcode = program[pointer];
    const literal = program[pointer + 1];
    const combo = comboCalc(literal);

    switch (opcode) {
      case 0:
        dv(combo, "a");
        break;
      case 1:
        bxl(literal);
        break;
      case 2:
        bst(combo);
        break;
      case 3:
        jnz(literal);
        break;
      case 4:
        bxc();
        break;
      case 5:
        result = out(combo);
        break;
      case 6:
        dv(combo, "b");
        break;
      case 7:
        dv(combo, "c");
        break;
      default:
        break;
    }
    pointer = pointer + 2;
  }
  if (result) {    
    lowestFound = true;
  } else {
    if (output.split(",").length < program.length + 1) {
      runningA = runningA * 1
    }
    runningA++;
  }
}

// Lower Bound: 11111111111636
// Upper Bound: 1111111111113172
console.log(runningA);

//1,6,3,6,5,6,5,1,7
