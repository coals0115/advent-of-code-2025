function solution() {
  const rack = {};

  for (const str of arr) {
    const [key, ...values] = str.split(" ");
    rack[key.slice(0, -1)] = values;
  }

  const memo = {};
  function countPaths(current, target) {
    if (current === target) return 1;

    if (!rack[current]) return 0;

    const cacheKey = `${current}-${target}`;

    if (memo[cacheKey] !== undefined) {
      return memo[cacheKey];
    }

    let total = 0;
    for (const nextServer of rack[current]) {
      total += countPaths(nextServer, target);
    }

    memo[cacheKey] = total;
    return total;
  }

  // svr -> dac -> fft -> out
  const path1 =
    countPaths("svr", "dac") *
    countPaths("dac", "fft") *
    countPaths("fft", "out");

  // svr -> fft -> dac -> out
  const path2 =
    countPaths("svr", "fft") *
    countPaths("fft", "dac") *
    countPaths("dac", "out");

  console.log("Case 1 (svr->dac->fft->out):", path1);
  console.log("Case 2 (svr->fft->dac->out):", path2);

  return path1 + path2;
}

solution();
