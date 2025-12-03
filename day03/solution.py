from unittest import result


def part1(number_arr):  # type = integer 배열
    max_num = max(number_arr[:-1])  # 1. number(integer 배열)에서 제일 큰 수를 찾는다. (단, 맨 끝 제외하고 가장 큰 수)
    max_index = number_arr.index(max_num)  # 1-1. 그 수의 index도 구하기

    number_arr_find_max2 = number_arr[max_index + 1:]  # 2. 그 이후 지점부터 또 다시 제일 큰 수를 찾기 (max2)
    max_num2 = max(number_arr_find_max2)

    return str(max_num) + str(max_num2)  # 3. return max1과 max2를 합쳐서 string 만들기

def part2(number_arr):
    """
    동일한 원리로..
    1. 첫 번째 자리: 끝에서 11개 제외하고 가장 큰 수
    2. 두 번째 자리: 그 이후 ~ 끝에서 10개 제외하고 가장 큰 수
    3. 세 번째 자리: 그 이후 ~ 끝에서 9개 제외하고 가장 큰 수
    4. ...
    5. 열두 번째 자리: 남은 것 중 가장 큰 수

    끝에서 N개 제외 >> 12개를 선택해야 하는데 첫 번째 숫자를 너무 뒤에서 골라버리면 남은 숫자가 11개 미만이기 때문에 12자리를 못 채움
    """

    # # 1. 첫 번째 자리: 끝에서 11개 제외하고 가장 큰 수
    # max_num_1 = max(number_arr[:-11])
    # max_index_1 = number_arr.index(max_num_1)
    #
    # # 2. 두 번째 자리: 그 이후 ~ 끝에서 10개 제외하고 가장 큰 수
    # max_num_2 = number_arr[max_index_1+1:-10]
    # max_index_2 = number_arr.index(max_num_2)
    #
    # # 3. 세 번째 자리: 그 이후 ~ 끝에서 9개 제외하고 가장 큰 수
    # max_num_3 = number_arr[max_index_2+1:-9]
    # max_index_3 = number_arr.index(max_num_3)
    #
    result = ""
    current_index = 0

    for i in range(12):
        남길_개수 = 11 - i  # 11, 10, 9, ... 1, 0

        if 남길_개수 == 0:
            search_range = number_arr[current_index:]
        else:
            search_range = number_arr[current_index:-남길_개수]

        max_num = max(search_range)
        max_index = number_arr.index(max_num, current_index)  # current_index부터 찾기

        result += str(max_num)
        current_index = max_index + 1

    return result




if __name__ == "__main__":
    numbers = open("input.txt", "r").read().splitlines()
    answer_numbers = []

    for number in numbers:
        number_arr = [int(n) for n in number]
        answer = part1(number_arr)
        answer_numbers.append(int(answer))

    print(f"Part1 {sum(answer_numbers)}")

    answer_numbers = []

    for number in numbers:
        number_arr = [int(n) for n in number]
        answer = part2(number_arr)
        answer_numbers.append(int(answer))
    print(f"Part2 {sum(answer_numbers)}")
