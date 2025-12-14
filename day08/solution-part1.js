class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] === x) {
      return x;
    }
    // Path Compression
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false;
    }

    this.parent[rootY] = rootX;
    this.size[rootX] += this.size[rootY];

    return true;
  }

  getSize(x) {
    const root = this.find(x);
    return this.size[root];
  }
}

/**
 * @description ["162,817,812", "57,618,57", ...]
 * @param {string[]} boxes
 */
function solution(boxes) {
  const coordinates = boxes.map((line) => line.split(",").map(Number));
  let pairs = [];

  for (let i = 0; i < coordinates.length - 1; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const [x1, y1, z1] = coordinates[i];
      const [x2, y2, z2] = coordinates[j];

      const distance = Math.sqrt(
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
      );

      pairs.push({
        box1: i, // 박스 1의 인덱스 (ID 역할)
        box2: j, // 박스 2의 인덱스 (ID 역할)
        dist: distance, // 거리
      });
    }
  }

  pairs.sort((a, b) => a.dist - b.dist);
  pairs = pairs.slice(0, 1000);

  const uf = new UnionFind(boxes.length);

  for (const element of pairs) {
    uf.union(element.box1, element.box2);
  }

  const circuitSizes = [];
  for (let i = 0; i < boxes.length; i++) {
    if (uf.parent[i] === i) {
      circuitSizes.push(uf.size[i]);
    }
  }

  circuitSizes.sort((a, b) => b - a);

  const top3 = circuitSizes.slice(0, 3);
  const answer = top3.reduce((acc, curr) => acc * curr, 1);

  return answer;
}

console.log(solution(arr));
