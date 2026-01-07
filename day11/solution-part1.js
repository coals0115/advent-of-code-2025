function solution() {
  const rack = {};

  for (const str of arr) {
    const [key, ...values] = str.split(" ");
    rack[key.slice(0, -1)] = values;
  }

  const paths = [];

  function dfs(path) {
    const server = path[path.length - 1];

    if (server === "out") {
      paths.push(path);
      return;
    }

    const servers = rack[server];

    if (!Array.isArray(servers)) return;

    for (const server of servers) {
      dfs([...path, server]);
    }
  }

  dfs(["you"]);

  return paths.length;
}
