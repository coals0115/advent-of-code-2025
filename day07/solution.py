def part1():
    lines = open("input.txt").read().split("\n")
    print(lines)


    # 1. S의 위치 찾기
    for row, line in enumerate(lines): # enumerate = 인덱스랑 값을 같이 줌
        # print(f"row: {row}, line: {line}")

        if 'S' in line:
            start_row = row
            start_col = line.index('S')
            break

    # 빔 목록 (시작은 S 바로 아래)
    beams = [(start_row + 1, start_col)]
    visited = set()
    split_count = 0 # 분할 횟수

    # 빔이 안 남아있을 때까지 계속 처리
    while beams:
        row, col = beams.pop() # 빔 하나 꺼내기

        # 아래로 내려가기
        while row < len(lines):
            # 이미 방문했으면 스킵 (두 분할기가 같은 위치에 빔을 쏘면 빔이 합쳐짐)
            if (row, col) in visited:
                break
            visited.add((row, col))

            char = lines[row][col]
            print(f"row: {row}, col: {col}, char: {char}")

            # 6. 분할기 만나면,
            if char == '^':
                # 6-1. 분할 카운트하고
                split_count += 1
                # 6-2. 왼쪽/오른쪽 새 빔 추가
                beams.append((row, col - 1))
                beams.append((row, col + 1))
                # 현재 빔은 여기서 ㄲ ㅡㅌ
                break

            # 6-3. 분할기 아니면 계속 아래로
            row += 1

    print(split_count)


if __name__ == "__main__":
    print("시작")

    part1()