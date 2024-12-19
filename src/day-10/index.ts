import { getInputValues } from '../../utils/helpers';

const input = getInputValues('src/day-10/input.txt');

type Point = { x: number; y: number };
type Grid = number[][];

const parseGrid = (input: string[]): Grid => 
    input.map(line => line.split('').map(Number));

const findTrailheads = (grid: Grid): Point[] => {
    const trailheads: Point[] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 0) {
                trailheads.push({ x, y });
            }
        }
    }
    return trailheads;
};

const getValidNeighbors = (point: Point, grid: Grid): Point[] => {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // left, right, up, down
    const currentHeight = grid[point.y][point.x];
    
    return directions
        .map(([dx, dy]) => ({ x: point.x + dx, y: point.y + dy }))
        .filter(({ x, y }) => 
            y >= 0 && y < grid.length && 
            x >= 0 && x < grid[0].length &&
            grid[y][x] === currentHeight + 1
        );
};

const countReachableNines = (start: Point, grid: Grid): number => {
    const visited = new Set<string>();
    const reachableNines = new Set<string>();
    
    const traversePathToNines = (point: Point) => {
        const key = `${point.x},${point.y}`;
        if (visited.has(key)) return;
        visited.add(key);
        
        if (grid[point.y][point.x] === 9) {
            reachableNines.add(key);
            return;
        }
        
        for (const neighbor of getValidNeighbors(point, grid)) {
            traversePathToNines(neighbor);
        }
    };
    
    traversePathToNines(start);
    return reachableNines.size;
};

const solve = (input: string[]): number => {
    const grid = parseGrid(input);
    const trailheads = findTrailheads(grid);
    
    return trailheads.reduce((sum, trailhead) => 
        sum + countReachableNines(trailhead, grid), 0);
};

const result = solve(input);
console.log('part 1:', result);