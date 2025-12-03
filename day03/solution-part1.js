function solution(batteries) {
  const joltages = [];

  for (const battery of batteries) {
    let firstIndex = 0;
    for (let i = 0; i < battery.length - 1; i++) {
      const prev = parseInt(battery[firstIndex]);
      const curr = parseInt(battery[i]);

      if (prev < curr) {
        firstIndex = i;
      }
    }

    let secondIndex = firstIndex + 1;
    for (let i = secondIndex; i < battery.length; i++) {
      const prev = parseInt(battery[secondIndex]);
      const curr = parseInt(battery[i]);

      if (prev < curr) {
        secondIndex = i;
      }
    }

    joltages.push(parseInt(`${battery[firstIndex]}${battery[secondIndex]}`));
  }

  return joltages.reduce((acc, curr) => (acc += curr), 0);
}
