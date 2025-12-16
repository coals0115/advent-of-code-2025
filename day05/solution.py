def part1():
    print("Part 1")

    # 1. 파일 읽
    content = open("input.txt").read()

    sections = content.split("\n\n")
    range_section = sections[0]
    ingredient_section = sections[1]

    # 2. 범위들 파싱
    # 각 줄이 "6599865270709-7145917173963" 형식
    ranges = []
    for line in range_section.strip().split("\n"):
        # '-'로 나눠서 시작, 끝 뽑기
        start, end = line.split("-")
        ranges.append((int(start), int(end)))

    # 3. 재료 ID들 파싱
    ingredients = []
    for line in ingredient_section.strip().split("\n"):
        ingredient_id = int(line)
        ingredients.append(ingredient_id)

    # 4. 각 재료 ID마다 신선한지 확인
    fresh_count = 0

    for ing_id in ingredients:
        # 4-1. 범위 목록 하나씩 for문 돌기
        is_fresh = False
        for start, end in ranges:
            # 4-2. 시작 <= 재료_id <= 끝 이면 신선한거
            if start <= ing_id <= end:
                is_fresh = True
                break  # 하나라도 해당되면 바로 탈출

        if is_fresh:
            fresh_count += 1

    print(fresh_count)
    return fresh_count


def part2():
    print("Part 2")

    # 1. 파일 읽기
    content = open("input.txt").read()
    sections = content.split("\n\n")
    range_section = sections[0]

    # 2. 범위들 파싱
    ranges = []
    for line in range_section.strip().split("\n"):
        start, end = line.split("-")
        ranges.append((int(start), int(end)))

    # 3. 범위 병합하기
    # 3-1. 시작점 기준으로 정렬
    ranges.sort()

    # 3-2. 겹치는 범위들 합치기
    merged = [ranges[0]]  # 첫 번째 범위로 시작

    for start, end in ranges[1:]:
        last_start, last_end = merged[-1]

        # 현재 범위가 이전 범위랑 겹치면 합치기
        # 예: (10, 14)랑 (12, 18)이 겹침 → (10, 18)
        if start <= last_end + 1:
            merged[-1] = (last_start, max(last_end, end))
        else:
            # 안 겹치면 새로 추가
            merged.append((start, end))

    # 3-3. 합쳐진 범위들의 길이 더하기
    # (3, 5)의 길이 = 5 - 3 + 1 = 3
    total = 0
    for start, end in merged:
        total += end - start + 1

    print(total)
    return total


if __name__ == "__main__":
    part1()
    part2()