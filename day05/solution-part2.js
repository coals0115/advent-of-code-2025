function solution(arr) {
  const ranges = [];
  const normalizedRanges = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      break;
    }

    const [start, end] = arr[i].split("-");
    ranges.push([BigInt(start), BigInt(end)]);
  }

  ranges.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  let current = ranges[0];
  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    if (current[1] >= start) {
      current[1] = current[1] > end ? current[1] : end;
    } else {
      normalizedRanges.push(current);
      current = [start, end];
    }
  }

  normalizedRanges.push(current);

  let count = 0n;
  for (const [start, end] of normalizedRanges) {
    count += end - start + 1n;
  }

  return count;
}
