# Advent of Code 2025 - Day 01

def part1():
    lines = open("input.txt").read().splitlines() # 1. 일단 입력 input 데이터 읽기
    start = 50 # 2. 시작 위치는 50
    count = 0

    for line in lines: # R10 L30
        부호 = (line[0] == 'L') # 3. 현재 num에서 # 4-1. R(왼쪽)이면 그 숫자만큼 - # 4-2. L(오른쪽)이면 그 숫자만큼 +
        number = int(line[1:])

        if 부호:  # L이면 True
            start = (start - number) % 100
        else:  # R이면 False
            start = (start + number) % 100

        # 4-3. 더한 다음에 그 결과가 0이면 check 변수에 +1
        if start == 0:
            count += 1
    return count

def part2():
    lines = open("input.txt").read().splitlines()
    start = 50
    count = 0

    for line in lines: # R10 L30
        부호 = (line[0] == 'L')
        number = int(line[1:])

        # 1. 1칸씩 number번 이동하면서 매번 0인지 체크
        for i in range(number):
            if 부호:
                start = (start - 1) % 10 # 왼쪽으로 1칸 이동
            else:
                start = (start + 1) % 100 # 오른쪽으로 1칸 이동

            if start == 0: # 2. 이동 중에 0을 지나가면 카운트
                count += 1
    return count

if __name__ == "__main__":
    print(f'정답: {part1()}')
    print(f'정답: {part2()}')
