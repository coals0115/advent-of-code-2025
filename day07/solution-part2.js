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

  let counts = Array.from({ length: builder.length }, () =>
    Array(builder[0].length).fill(0)
  );

  for (let i = 0; i < builder.length; i++) {
    const line = builder[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === "S") {
        counts[i][j] = 1;
      }

      // 마지막줄 예외처리
      if (i < builder.length - 1) {
        // 현재 칸이 빈공간? 승계
        if (char === "." || char === "|" || char === "S") {
          counts[i + 1][j] += counts[i][j];
        }

        // 현재 칸이 분리기면? 아래 라인 좌우에 더해주기
        if (char === "^") {
          counts[i + 1][j - 1] += counts[i][j];
          counts[i + 1][j + 1] += counts[i][j];
        }
      }
    }
  }

  return counts[counts.length - 1].reduce((acc, curr) => (acc += curr), 0);
}
