const fs = require('fs');

function parseMachine(line) {
  const parts = line.split(' ');
  const diagram = parts[0].slice(1, -1);
  const target = diagram.split('').map(c => c === '#' ? 1 : 0);
  const buttons = [];
  let i = 1;
  
  while (i < parts.length && parts[i].startsWith('(')) {
    const btnStr = parts[i].slice(1, -1);
    const btn = btnStr.split(',').map(Number);
    buttons.push(btn);
    i++;
  }
  
  return { target, buttons };
}

function solveMachine(target, buttons) {
  const n = target.length;
  const m = buttons.length;
  let minPress = Infinity;
  
  // Brute force all combinations
  for (let mask = 0; mask < (1 << m); mask++) {
    const state = Array(n).fill(0);
    let presses = 0;
    
    for (let j = 0; j < m; j++) {
      if (mask & (1 << j)) {
        presses++;
        for (const idx of buttons[j]) {
          state[idx] ^= 1;
        }
      }
    }
    
    if (state.every((v, k) => v === target[k])) {
      minPress = Math.min(minPress, presses);
    }
  }
  
  return minPress;
}

function solution() {
  const input = fs.readFileSync('day10/input.txt', 'utf8').trim();
  const lines = input.split('\n');
  let totalPresses = 0;
  
  for (const line of lines) {
    const { target, buttons } = parseMachine(line);
    const minPress = solveMachine(target, buttons);
    totalPresses += minPress;
  }
  
  return totalPresses;
}

console.log(solution());