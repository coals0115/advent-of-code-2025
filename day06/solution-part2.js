function solution(arr) {
  const columnLength = arr[0].length;
  const splits = [];

  let split = [];
  for (let i = 0; i < columnLength; i++) {
    // 아래 루프에서 숫자 하나 만들기
    // arr.length - 1 -> 부호는 제외
    let num = "";
    for (let j = 0; j < arr.length - 1; j++) {
      num += arr[j][i];
    }

    if (i === columnLength - 1) {
      split.push(parseInt(num));
      splits.push(split);
      break;
    }

    if (num.trim() === "") {
      splits.push(split);
      split = [];
    } else {
      split.push(parseInt(num));
    }
  }

  let total = 0;
  const ops = arr[arr.length - 1].split(" ").filter((x) => x);

  for (let i = 0; i < splits.length; i++) {
    const op = ops[i];

    if (op === "*") {
      total += splits[i].reduce((acc, curr) => (acc *= curr), 1);
    } else if (op === "+") {
      total += splits[i].reduce((acc, curr) => (acc += curr), 0);
    }
  }

  return total;
}
