function solution(batteries) {
  const joltages = [];

  for (const battery of batteries) {
    let candidateCount = battery.length - 12;
    let joltage = [];

    for (const c of battery) {
      while (
        candidateCount > 0 &&
        joltage.length > 0 &&
        joltage[joltage.length - 1] < c
      ) {
        joltage.pop();
        candidateCount--;
      }

      joltage.push(c);
    }

    joltage = joltage.slice(0, 12);
    joltages.push(parseInt(joltage.join("")));
  }

  return joltages.reduce((acc, curr) => (acc += curr), 0);
}
