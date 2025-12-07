function solution(arr) {
  let total = 0;
  const splits = [];

  for (const line of arr) {
    splits.push(line.split(" ").filter((x) => x));
  }

  const columnCount = splits[0].length;

  for (let i = 0; i < columnCount; i++) {
    const numbers = [];
    const op = splits[arr.length - 1][i];
    for (let j = 0; j < arr.length - 1; j++) {
      numbers.push(parseInt(splits[j][i]));
    }

    if (op === "*") {
      total += numbers.reduce((acc, curr) => (acc *= curr), 1);
    } else if (op === "+") {
      total += numbers.reduce((acc, curr) => (acc += curr), 0);
    }
  }

  return total;
}
