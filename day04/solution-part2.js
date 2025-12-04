/**
 *
 * @param {string[]} arr
 */
function solution(arr) {
  let diagram = arr;
  let accessibleRollpaperCount = 0;

  function tidyUp(tidyUpArr) {
    let newDiagram = [];
    for (let i = 0; i < tidyUpArr.length; i++) {
      const prevRow = i === 0 ? "" : tidyUpArr[i - 1];
      const row = tidyUpArr[i];
      const nextRow = i === tidyUpArr.length - 1 ? "" : tidyUpArr[i + 1];

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

        if (c === "@" && paperCount < 4) {
          builder += ".";
          accessibleRollpaperCount++;
        } else {
          builder += row[j];
        }
      }
      newDiagram.push(builder);
    }

    return newDiagram.join("\n") === tidyUpArr.join("\n")
      ? newDiagram
      : tidyUp(newDiagram);
  }

  diagram = tidyUp(arr);

  return diagram.join("\n");
}

console.log(solution(arr2));
