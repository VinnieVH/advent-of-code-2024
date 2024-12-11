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

const findXMasPattern = (grid: string[]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const checkDiagonal = (row: number, col: number, dx: number, dy: number): boolean => {
        if (row + dx * 2 < 0 || row + dx * 2 >= rows) return false;
        if (col + dy * 2 < 0 || col + dy * 2 >= cols) return false;

        const diagonal = [];
        for (let i = 0; i < 3; i++) {
            diagonal.push(grid[row + dx * i][col + dy * i]);
        }
        const pattern = diagonal.join('');
        return pattern === 'MAS' || pattern === 'SAM';
    };

    // Check every position as a potential center point of the X
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            // Check if center is 'A'
            if (grid[row][col] === 'A') {
                // Check both diagonal pairs
                if (
                    // Check top-left to bottom-right diagonal
                    ((checkDiagonal(row - 1, col - 1, 1, 1)) &&
                    // Check top-right to bottom-left diagonal
                    (checkDiagonal(row - 1, col + 1, 1, -1))) ||
                    // Check alternative direction for both diagonals
                    ((checkDiagonal(row + 1, col + 1, -1, -1)) &&
                    (checkDiagonal(row + 1, col - 1, -1, 1)))
                ) {
                    count++;
                }
            }
        }
    }

    return count;
};


const input = getInputValues('src/day-4/input.txt');

console.log("Part 1:", findXMAS(input));
console.log("Part 2:", findXMasPattern(input));