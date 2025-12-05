function solution(arr) {
  const ranges = [];
  const ingredients = [];
  const freshMap = new Map();

  let blankLineIndex = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      blankLineIndex = i;
      break;
    }

    const [start, end] = arr[i].split("-");
    ranges.push([BigInt(start), BigInt(end)]);
  }

  for (let i = blankLineIndex + 1; i < arr.length; i++) {
    ingredients.push(BigInt(arr[i]));
  }

  for (const ingredient of ingredients) {
    for (const [start, end] of ranges) {
      if (start <= ingredient && ingredient <= end) {
        if (!freshMap.has(ingredient)) {
          freshMap.set(ingredient, 1);
        }
      }
    }
  }

  return freshMap.size;
}
