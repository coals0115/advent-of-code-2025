function solution(arr) {
  let builder = [arr[0]];
  let splitTimes = 0;

  for (let i = 1; i < arr.length; i++) {
    const prevLine = builder[i - 1];
    const line = arr[i];

    let newLine = "";
    for (let j = 0; j < line.length; j++) {
      if (prevLine[j] === "S") {
        newLine += "|";
      } else if (prevLine[j] === "|") {
        if (line[j] === "^") {
          newLine = newLine.substring(0, newLine.length - 1);
          newLine += "|^";
          splitTimes++;
        } else {
          newLine += "|";
        }
      } else if (j > 0 && prevLine[j - 1] === "|" && line[j - 1] === "^") {
        newLine += "|";
      } else {
        newLine += line[j];
      }
    }

    builder.push(newLine);
  }

  console.log(builder.join("\n"));

  return splitTimes;
}

console.log(solution(arr2));
