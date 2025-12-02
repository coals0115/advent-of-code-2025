function solution(ranges) {
  const sillies = [];

  for (const range of ranges) {
    const [startString, endString] = range.split("-");
    const rangeStart = parseInt(startString);
    const rangeEnd = parseInt(endString);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      const curr = i.toString();

      for (let j = 1; j <= curr.length; j++) {
        const arr = [];
        for (let k = 0; k < curr.length; k += j) {
          arr.push(curr.slice(k, k + j));
        }

        if (arr.length >= 2 && arr.every((x) => x === arr[0])) {
          if (!sillies.includes(i)) {
            sillies.push(i);
          }
        }
      }
    }
  }

  return sillies.reduce((acc, curr) => (acc += curr), 0);
}
