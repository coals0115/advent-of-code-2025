function solution(arr) {
  const coordinates = arr.map((line) => {
    const [x, y] = line.trim().split(",").map(Number);
    return { x, y };
  });

  // ----------------------------------------------------
  // Step 1: 좌표 압축 (Coordinate Compression)
  // ----------------------------------------------------

  // X, Y 좌표를 각각 모아서 중복 제거하고 정렬
  const uniqueX = [...new Set(coordinates.map((p) => p.x))].sort(
    (a, b) => a - b
  );
  const uniqueY = [...new Set(coordinates.map((p) => p.y))].sort(
    (a, b) => a - b
  );

  // 실제 좌표 -> 압축 인덱스 매핑 (Lookup Map)
  // 패딩(Padding)을 위해 인덱스를 1부터 시작하게 함 (0은 외벽용)
  const xMap = new Map(uniqueX.map((val, idx) => [val, idx + 1]));
  const yMap = new Map(uniqueY.map((val, idx) => [val, idx + 1]));

  const W = uniqueX.length + 2; // 좌우 패딩 포함 너비
  const H = uniqueY.length + 2; // 상하 패딩 포함 높이

  // 격자판 생성 (0: 미정, 1: 벽/내부, 2: 외부)
  const grid = Array.from({ length: H }, () => new Array(W).fill(0));

  // ----------------------------------------------------
  // Step 2: 테두리 그리기 (Drawing Boundaries)
  // ----------------------------------------------------
  const N = coordinates.length;
  for (let i = 0; i < N; i++) {
    const curr = coordinates[i];
    const next = coordinates[(i + 1) % N]; // 마지막 점은 첫 점과 연결

    const x1 = xMap.get(curr.x);
    const y1 = yMap.get(curr.y);
    const x2 = xMap.get(next.x);
    const y2 = yMap.get(next.y);

    // 가로선 or 세로선 그리기
    const startX = Math.min(x1, x2);
    const endX = Math.max(x1, x2);
    const startY = Math.min(y1, y2);
    const endY = Math.max(y1, y2);

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        grid[y][x] = 1; // 1은 '벽' (나중에 내부로 취급)
      }
    }
  }

  // ----------------------------------------------------
  // Step 3: 외부 판별 (Flood Fill / BFS)
  // ----------------------------------------------------
  const queue = [[0, 0]]; // (0,0)은 확실히 외부(Padding 영역)
  grid[0][0] = 2; // 2는 '외부'

  // BFS로 외부인 곳을 2로 채움
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      // 범위 안이고, 아직 방문 안 했고, 벽(1)이 아니면 이동
      if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
        if (grid[ny][nx] === 0) {
          grid[ny][nx] = 2; // 외부로 표시
          queue.push([nx, ny]);
        }
      }
    }
  }

  // ----------------------------------------------------
  // Step 4: 지도 정리 & 누적 합 (Prefix Sum)
  // ----------------------------------------------------

  // 최종적으로 유효한 땅(벽 + 내부)은 1, 외부는 0으로 변환
  const finalGrid = Array.from({ length: H }, () => new Array(W).fill(0));

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // BFS가 닿지 않은 곳(0)과 벽(1)은 유효한 땅(1)
      // BFS가 닿은 곳(2)은 무효한 땅(0)
      finalGrid[y][x] = grid[y][x] === 2 ? 0 : 1;
    }
  }

  // 2차원 누적 합 배열 생성 (P[y][x] = (0,0)~(x,y) 사각형 안의 합)
  const P = Array.from({ length: H }, () => new Array(W).fill(0));

  for (let y = 1; y < H; y++) {
    for (let x = 1; x < W; x++) {
      P[y][x] = finalGrid[y][x] + P[y - 1][x] + P[y][x - 1] - P[y - 1][x - 1];
    }
  }

  // 구간 합 구하는 헬퍼 함수
  function getSum(x1, y1, x2, y2) {
    return P[y2][x2] - P[y1 - 1][x2] - P[y2][x1 - 1] + P[y1 - 1][x1 - 1];
  }

  // ----------------------------------------------------
  // Step 5: 최대 직사각형 찾기 (Main Logic)
  // ----------------------------------------------------
  let maxArea = 0n;

  // 모든 빨간 점 쌍(Pair)에 대해 반복
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const p1 = coordinates[i];
      const p2 = coordinates[j];

      // 1. 압축 좌표계에서의 범위 구하기
      // (주의: 항상 왼쪽 위 ~ 오른쪽 아래 순서로 정렬해야 함)
      const mapX1 = xMap.get(p1.x);
      const mapY1 = yMap.get(p1.y);
      const mapX2 = xMap.get(p2.x);
      const mapY2 = yMap.get(p2.y);

      const minX = Math.min(mapX1, mapX2);
      const maxX = Math.max(mapX1, mapX2);
      const minY = Math.min(mapY1, mapY2);
      const maxY = Math.max(mapY1, mapY2);

      // 2. 해당 영역의 넓이(칸 수) 계산
      // 압축 그리드 상에서 가로 몇 칸, 세로 몇 칸인지
      const widthCount = maxX - minX + 1;
      const heightCount = maxY - minY + 1;
      const targetCount = widthCount * heightCount;

      // 3. 누적 합으로 실제 유효한 칸 개수 확인
      const currentSum = getSum(minX, minY, maxX, maxY);

      // 4. 검증: 빈 곳 없이 꽉 찼는가?
      if (currentSum === targetCount) {
        // 5. 실제 넓이 계산 (원래 좌표 사용)
        // 문제에서 타일 간 거리 포함이므로 +1 (inclusive)
        // ex) 2~9번 타일 => 길이 8 (9-2+1)
        const realW = Math.abs(p1.x - p2.x) + 1;
        const realH = Math.abs(p1.y - p2.y) + 1;
        const area = realW * realH;

        // BigInt로 처리해야 할 수도 있음 (문제 조건에 따라)
        // 여기선 number로 처리
        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }

  return maxArea;
}
