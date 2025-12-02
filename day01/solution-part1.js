function solution(arr) {
  let start = 50;
  let count = 0;

  for (const rotation of arr) {
    const sign = rotation[0];
    const degreeString = rotation.slice(1);
    const degree = parseInt(degreeString);

    if (sign === "L") {
      start = (start - degree) % 100;
    } else if ("R") {
      start = (start + degree) % 100;
    } else {
      continue;
    }

    if (start === 0) {
      count++;
    }
  }

  return count;
}
