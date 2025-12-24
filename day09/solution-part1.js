function solution(arr) {
  const coordinates = arr.map((x) => x.split(",").map(Number));
  let widestArea = 0;

  // 가장 큰 직사각형
  // abs(x1 - x2) 그리고 abs(y1 - y2)의 차이가 가장 큰 두 점
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const [x1, y1] = coordinates[i];
      const [x2, y2] = coordinates[j];

      const w = Math.abs(x1 - x2) + 1;
      const h = Math.abs(y1 - y2) + 1;
      const area = w * h;

      if (widestArea < area) {
        widestArea = area;
      }
    }
  }

  return widestArea;
}
