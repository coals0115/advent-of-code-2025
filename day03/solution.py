def part1(number_arr):  # type = integer 배열
    max_num = max(number_arr[:-1])  # 1. number(integer 배열)에서 제일 큰 수를 찾는다. (단, 맨 끝 제외하고 가장 큰 수)
    max_index = number_arr.index(max_num)  # 1-1. 그 수의 index도 구하기

    number_arr_find_max2 = number_arr[max_index + 1:]  # 2. 그 이후 지점부터 또 다시 제일 큰 수를 찾기 (max2)
    max_num2 = max(number_arr_find_max2)

    return str(max_num) + str(max_num2)  # 3. return max1과 max2를 합쳐서 string 만들기


if __name__ == "__main__":
    numbers = open("input.txt", "r").read().splitlines()
    answer_numbers = []

    for number in numbers:
        number_arr = [int(n) for n in number]
        answer = part1(number_arr)
        answer_numbers.append(int(answer))

    print(f"Part1 {sum(answer_numbers)}")
