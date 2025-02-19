export const validateSudoku = (board) => {
    const rows = Array(9).fill().map(() => new Set());
    const cols = Array(9).fill().map(() => new Set());
    const boxes = Array(9).fill().map(() => new Set());
  
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = board[r][c];
        
        if (value === "." || value === "") {
          continue;
        }
  
        const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
  
        if (rows[r].has(value) || cols[c].has(value) || boxes[boxIndex].has(value)) {
          return false;
        }
  
        rows[r].add(value);
        cols[c].add(value);
        boxes[boxIndex].add(value);
      }
    }
  
    return true;
  };
  
export const solveSudoku = (board) => {
const isValid = (row, col, num) => {
    for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
        return false;
    }
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
        return false;
        }
    }
    }

    return true;
};

const solve = () => {
    for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        if (board[row][col] === "." || board[row][col] === "") {
        for (let num = 1; num <= 9; num++) {
            const numStr = num.toString();
            if (isValid(row, col, numStr)) {
            board[row][col] = numStr;

            if (solve()) {
                return true;
            }

            board[row][col] = ".";
            }
        }
        return false;
        }
    }
    }
    return true;
};

if (!validateSudoku(board)) {
    console.log("Invalid Sudoku board");
    return false;
}

return solve();
};