function solution(arr) {
  let start = 50;
  let count = 0;

  for (const rotation of arr) {
    const sign = rotation[0];
    const degreeString = rotation.slice(1);
    const degree = parseInt(degreeString);

    if (sign === "L") {
      const calcStart = start === 0 ? 100 : start;
      const sub = calcStart - degree;

      if (sub <= 0) {
        count += Math.floor((degree - calcStart) / 100) + 1;
      }

      start = (((start - degree) % 100) + 100) % 100;
    } else if (sign === "R") {
      const sum = start + degree;

      if (sum >= 100) {
        count += Math.floor(sum / 100);
      }

      start = (start + degree) % 100;
    }
  }

  return count;
}
