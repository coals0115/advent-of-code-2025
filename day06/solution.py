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

    print(total)
    return total


if __name__ == "__main__":
    part1()