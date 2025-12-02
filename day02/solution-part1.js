function solution(ranges) {
  const sillies = [];

  for (const range of ranges) {
    const [startString, endString] = range.split("-");
    const rangeStart = parseInt(startString);
    const rangeEnd = parseInt(endString);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      const curr = i.toString();

      if (curr.length % 2 === 1) continue;

      let start = "";
      let end = "";
      for (let j = 0; j < curr.length / 2; j++) {
        start += curr[j];
        end += curr[curr.length / 2 + j];
      }

      if (start === end) {
        sillies.push(i);
      }
    }
  }

  return sillies.reduce((acc, curr) => (acc += curr), 0);
}
