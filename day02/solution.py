def part1():
    # 1. dau-2/input.txt 읽기
    numbers = open("input.txt").read().split(",")
    result = []
    # 2. 그냥 string으로 받아서 , 기준으로 split 하기
    for number in numbers:
        # 3. 그 split 한거에서 '-' 기준으로 나누기
        start, end = number.split("-")

        # 4. for문 돌리는데 시작은 [0] 끝은 [1] 까지.. check 돌리기
        for i in range(int(start), int(end) + 1):
            # 5. check가 반환한 값이 True면 list에 그 값 저장
            if check(i):
                result.append(i)

    # 6. 마지막에 list에 있는 값 모두 sum해서 출력
    return sum(result)

def check(number):
    # 1. 길이가 짝수인지 확인한다.
    s = str(number)
    length = len(s)

    # 2. 짝수면 반으로 나눠서 앞뒤 같은지 확인하기
    if length % 2 == 0:
        # 2-1. 반으로 나눈다.
        half = length // 2
        # 2-2. 앞뒤가 같은지 확인한다.
        if s[:half] == s[half:]:
            return True

    return False

if __name__ == "__main__":
    print(f'Part 1: {part1()}')