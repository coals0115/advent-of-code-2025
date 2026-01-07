const fs = require('fs');

/**
 * Parses a single line of input.
 * Format: [.##.] (3) (1,3) ... {3,5,4,7}
 */
function parseMachine(line) {
  // Extract target from curly braces
  const targetMatch = line.match(/\{([\d,]+)\}/);
  if (!targetMatch) return null;
  const target = targetMatch[1].split(',').map(Number);

  // Extract buttons from parentheses
  // We can use a global regex to find all (x,y,z) groups
  const buttonMatches = [...line.matchAll(/\(([\d,]+)\)/g)];
  const buttons = buttonMatches.map(m => m[1].split(',').map(Number));

  return { target, buttons };
}

/**
 * Gaussian elimination to solve Ax = b
 * Returns { solution, freeVars, kernel } or similar structure
 * to allow searching free variables.
 * 
 * We work with floating point numbers but will check for integers later.
 * 
 * Matrix dimensions:
 * Rows = number of counters (target.length)
 * Cols = number of buttons (buttons.length)
 */
function solveMachine(target, buttons) {
  const numRows = target.length;
  const numCols = buttons.length;

  // Build the augmented matrix [A | b]
  // A[row][col] is 1 if button col affects counter row, else 0
  let matrix = Array(numRows).fill(0).map(() => Array(numCols + 1).fill(0));

  for (let c = 0; c < numCols; c++) {
    const btn = buttons[c];
    for (const r of btn) {
      if (r < numRows) {
        matrix[r][c] = 1;
      }
    }
  }

  for (let r = 0; r < numRows; r++) {
    matrix[r][numCols] = target[r];
  }

  // Calculate upper bounds for each button based on targets
  // Since buttons only add positive integers, a button j cannot be pressed more than
  // target[i] times if button j affects counter i.
  const bounds = buttons.map((btn, btnIdx) => {
    let minBound = Infinity;
    for (const r of btn) { // btn contains indices of affected counters
      if (r < target.length) {
        minBound = Math.min(minBound, target[r]);
      }
    }
    return minBound === Infinity ? 0 : minBound;
  });

  // Gaussian elimination to RREF
  let pivotRow = 0;
  const pivotCols = []; // record which column is pivot for each row

  for (let c = 0; c < numCols && pivotRow < numRows; c++) {
    // Find pivot
    let sel = -1;
    for (let r = pivotRow; r < numRows; r++) {
      if (Math.abs(matrix[r][c]) > 1e-9) {
        sel = r;
        break;
      }
    }

    if (sel === -1) continue; // No pivot in this column (free variable)

    // Swap rows
    [matrix[pivotRow], matrix[sel]] = [matrix[sel], matrix[pivotRow]];

    // Normalize pivot row
    const val = matrix[pivotRow][c];
    for (let j = c; j <= numCols; j++) {
      matrix[pivotRow][j] /= val;
    }

    // Eliminate other rows
    for (let r = 0; r < numRows; r++) {
      if (r !== pivotRow) {
        const factor = matrix[r][c];
        if (Math.abs(factor) > 1e-9) {
          for (let j = c; j <= numCols; j++) {
            matrix[r][j] -= factor * matrix[pivotRow][j];
          }
        }
      }
    }

    pivotCols[pivotRow] = c;
    pivotRow++;
  }

  // Check for consistency: if any row is all zeros but target is non-zero
  for (let r = pivotRow; r < numRows; r++) {
    if (Math.abs(matrix[r][numCols]) > 1e-9) {
      return Infinity; // No solution
    }
  }

  // Identify free variables
  const isPivotCol = new Set(pivotCols);
  const freeVars = [];
  for (let c = 0; c < numCols; c++) {
    if (!isPivotCol.has(c)) {
      freeVars.push(c);
    }
  }
  
  let minTotal = Infinity;

  function solveRecursive(freeVarIndex, currentFreeValues) {
    if (freeVarIndex === freeVars.length) {
      // All free vars set. Calculate pivot vars.
      let currentTotal = 0;
      const x = Array(numCols).fill(0);
      
      // Set free vars
      for (let i = 0; i < freeVars.length; i++) {
        x[freeVars[i]] = currentFreeValues[i];
        currentTotal += currentFreeValues[i];
      }
      
      // Calculate pivot vars
      let feasible = true;
      for (let r = pivotRow - 1; r >= 0; r--) { // Optimization: order doesn't strictly matter for calc, but logical
        const pivotColIdx = pivotCols[r];
        if (pivotColIdx === undefined) continue;

        let val = matrix[r][numCols]; // Constant term
        
        // Subtract contributions from free vars
        // Note: In RREF, pivot var depends on free vars and subsequent pivot vars?
        // In RREF, a pivot var only depends on non-pivot cols (free vars) to its right.
        // But our matrix extraction eliminated all other entries in the column 'c', so it depends ONLY on free vars (and the constant).
        
        for (let i = 0; i < freeVars.length; i++) {
          const freeColIdx = freeVars[i];
          val -= matrix[r][freeColIdx] * x[freeColIdx];
        }
        
        // Check integer and non-negative
        if (val < -1e-9) { feasible = false; break; }
        if (Math.abs(val - Math.round(val)) > 1e-9) { feasible = false; break; }
        
        const intVal = Math.round(val);
        // Additional check: Does this respect the original bound?
        // Although math ensures Ax=b, we must respect x <= bound derived from target.
        if (intVal > bounds[pivotColIdx]) { feasible = false; break; }
        
        x[pivotColIdx] = intVal;
        currentTotal += intVal;
      }
      
      if (feasible && currentTotal < minTotal) {
        minTotal = currentTotal;
      }
      return;
    }

    const freeColIdx = freeVars[freeVarIndex];
    const maxVal = bounds[freeColIdx];
    
    // Iterate 0 to bound
    for (let val = 0; val <= maxVal; val++) {
       // Optimization: prune if partial sum exceeds minTotal (not fully safe if negative coeffs exist? 
       // But wait, negative coeffs mean increasing free var increases pivot var.
       // If all coeffs are such that cost increases, we can prune.
       // For now, raw brute force with bounds is safer correctness-wise.
       solveRecursive(freeVarIndex + 1, [...currentFreeValues, val]);
    }
  }

  solveRecursive(0, []);
  
  return minTotal;
}

function solution() {
  const input = fs.readFileSync('day10/input.txt', 'utf8').trim();
  const lines = input.split('\n');
  let totalPresses = 0;
  
  for (const line of lines) {
    if (!line.trim()) continue;
    const machine = parseMachine(line);
    if (!machine) continue;
    
    const minPress = solveMachine(machine.target, machine.buttons);
    if (minPress === Infinity) {
        console.log("No solution found for machine");
    } else {
        totalPresses += minPress;
    }
  }
  
  return totalPresses;
}

console.log(solution());
