/**
 *
 * @param {string[]} arr
 */
function solution(arr) {
  let accessibleRollpaperCount = 0;

  for (let i = 0; i < arr.length; i++) {
    const prevRow = i === 0 ? "" : arr[i - 1];
    const row = arr[i];
    const nextRow = i === arr.length - 1 ? "" : arr[i + 1];

    let builder = "";
    for (let j = 0; j < row.length; j++) {
      let paperCount = 0;

      const tl = prevRow[j - 1];
      const t = prevRow[j + 1];
      const tr = prevRow[j];
      const cl = row[j - 1];
      const c = row[j];
      const cr = row[j + 1];
      const bl = nextRow[j - 1];
      const b = nextRow[j];
      const br = nextRow[j + 1];

      if (tl === "@") paperCount++;
      if (t === "@") paperCount++;
      if (tr === "@") paperCount++;
      if (cl === "@") paperCount++;
      if (cr === "@") paperCount++;
      if (bl === "@") paperCount++;
      if (b === "@") paperCount++;
      if (br === "@") paperCount++;

      console.log(i, j, "paper count", paperCount);
      if (c === "@" && paperCount < 4) {
        builder += "x";
        accessibleRollpaperCount++;
      } else {
        builder += row[j];
      }
    }
  }

  return accessibleRollpaperCount;
}

console.log(solution(arr2));
