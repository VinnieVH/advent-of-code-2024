import { getInputValues } from "../../utils/helpers";

const findXMAS = (grid: string[]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const word = "XMAS";
    let count = 0;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    const checkWord = (row: number, col: number, dx: number, dy: number): boolean => {
        if (row + dx * 3 < 0 || row + dx * 3 >= rows) return false;
        if (col + dy * 3 < 0 || col + dy * 3 >= cols) return false;

        for (let i = 0; i < word.length; i++) {
            if (grid[row + dx * i][col + dy * i] !== word[i]) {
                return false;
            }
        }
        return true;
    };

        // Check every position as a potential starting point
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Only check if current position is 'X'
            if (grid[row][col] === 'X') {
                // Try all directions
                for (const [dx, dy] of directions) {
                    if (checkWord(row, col, dx, dy)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
};


console.log(findXMAS(getInputValues('src/day-4/input.txt')));