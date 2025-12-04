def part1():
    grid = open("input.txt").read().splitlines()
    count = 0

    # 3. grid 모든 칸을 돌면서
    for row in range(len(grid)):
        for col in range(len(grid[row])):
            # 4. 그 칸이 @(종이 롤)이면
            if grid[row][col] == "@":
                # 5. 주변 8칸에 @가 몇 개 있는지 세기
                인접_개수 = 인접_롤_확인(grid, row, col)

                # 6. 3개 이하면 접근 ㄱㄴ
                if 인접_개수 < 4:
                    count += 1

    print(count)


# 8방향: 좌상, 상, 우상, 좌, 우, 좌하, 하, 우하
# (-1, -1) =>>> (행 이동량, 열 이동량)
directions = [
    (-1, -1), (-1, 0), (-1, 1),
    (0, -1),           (0, 1),
    (1, -1),  (1, 0),  (1, 1)
]


def 인접_롤_확인(grid, row, col):
    count = 0

    # 2. 8방향 하나씩 확인
    for delta_row, delta_col in directions:
        # 3. 확인할 위치 계산 (현재 위치 + 이동량)
        new_row = row + delta_row
        new_col = col + delta_col

        # 4. 경계 부분 처리 >> 격자 범위 안인지 확인
        if 0 <= new_row < len(grid) and 0 <= new_col < len(grid[0]):
            # 5. 그 칸이 @이면 카운트
            if grid[new_row][new_col] == "@":
                count += 1

    return count

if __name__ == "__main__":
    part1()