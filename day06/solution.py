def part1():
    # 1. 파일 읽기
    lines = open("input.txt").read().split("\n")

    # 2. 각 줄 split해서 쪼개기 >> split()이 알아서 공백 여러개를 하나로 처리해줌
    rows = [line.split() for line in lines]

    """3. 같은 위치끼리 묶어서 문제 단위로 만들기
    rows[0] = [9, 11, 71] <--- 문제의 첫번째 숫자
    rows[4] = [*, +, +]   <0000h 각 문제의 연산자
    3-1. zip으로 묶기 """
    problems = list(zip(*rows))

    # 4. 각 문제 계산해서 더하기
    total = 0

    for problem in problems:
        # problem = (9, 15, 84, 942, '*')
        # 마지막이 연산자, 나머지가 숫자
        nums = problem[:-1]
        operation = problem[-1]

        # 9 * 15 * 84 * 942 이렇게 만들어서 eval
        result = eval(f' {operation} '.join(nums))
        total += result

    return total


def part2():
    lines = open("input.txt").read().split("\n")

    # 2. 줄 길이 맞추기 (짧은 줄은 공백으로 채움)
    max_len = max(len(line) for line in lines)
    lines = [line.ljust(max_len) for line in lines]

    number = ""
    problem = []
    all_problems = []

    # 3. range(마지막인덱스, -1, -1) >> 역순으로 둘기
    for col in range(len(lines[0]) - 1, -1, -1):
        # 4. 위 -> 아래로 행 돌기
        for row in range(len(lines)):
            char = lines[row][col]
            if char != " ":
                number += char

        # 5. 열 하나가 끝나는 시점.. 여기서 숫자들 다 더하기..
        if number != "":
            # 마지막 글자가 연산자면 문제 하나 완성
            if number[-1] in "*+":
                연산자 = number[-1]
                숫자부분 = number[:-1]

                # problem에 추가
                problem.append(숫자부분)

                # 문제 하나 완성되면 저장하고 초기화
                all_problems.append((problem, 연산자))
                problem = []
            else:
                # 연산자 없으면 그냥 숫자임. problem에 그냥 넣기
                problem.append(number)
        number = ""

    # 계산 ㄱㄱ
    total = 0
    for nums, operation in all_problems:
        result = eval(f" {operation} ".join(nums))
        total += result

    return total


if __name__ == "__main__":
    print(f"part1: {part1()}")
    print(f"part2: {part2()}")
