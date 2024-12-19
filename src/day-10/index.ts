import { getInputValues } from '../../utils/helpers';

type Point = { x: number; y: number };
type Grid = number[][];

// Grid utilities
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

// Point utilities
const createKey = (point: Point): string => `${point.x},${point.y}`;

const isValidPoint = (point: Point, grid: Grid): boolean => 
    point.y >= 0 && 
    point.y < grid.length && 
    point.x >= 0 && 
    point.x < grid[0].length;

const getValidNeighbors = (point: Point, grid: Grid): Point[] => {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // left, right, up, down
    const currentHeight = grid[point.y][point.x];
    
    return directions
        .map(([dx, dy]) => ({ x: point.x + dx, y: point.y + dy }))
        .filter(neighbor => 
            isValidPoint(neighbor, grid) &&
            grid[neighbor.y][neighbor.x] === currentHeight + 1
        );
};

// Part 1 specific logic
const countReachableNines = (start: Point, grid: Grid): number => {
    const visited = new Set<string>();
    const reachableNines = new Set<string>();
    
    const traversePathToNines = (point: Point): void => {
        const key = createKey(point);
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

// Part 2 specific logic
const countDistinctPaths = (start: Point, grid: Grid): number => {
    const cache = new Map<string, number>();
    
    const countPaths = (point: Point): number => {
        const key = createKey(point);
        if (cache.has(key)) return cache.get(key)!;
        
        if (grid[point.y][point.x] === 9) {
            return 1;
        }
        
        const paths = getValidNeighbors(point, grid)
            .reduce((sum, neighbor) => sum + countPaths(neighbor), 0);
        
        cache.set(key, paths);
        return paths;
    };
    
    return countPaths(start);
};

const calculateTrailheadScores = (
    grid: Grid, 
    scoreCalculator: (start: Point, grid: Grid) => number
): number => {
    const trailheads = findTrailheads(grid);
    return trailheads.reduce((sum, trailhead) => 
        sum + scoreCalculator(trailhead, grid), 0);
};

const solvePart1 = (input: string[]): number => {
    const grid = parseGrid(input);
    return calculateTrailheadScores(grid, countReachableNines);
};

const solvePart2 = (input: string[]): number => {
    const grid = parseGrid(input);
    return calculateTrailheadScores(grid, countDistinctPaths);
};

const input = getInputValues('src/day-10/input.txt');
const result1 = solvePart1(input);
const result2 = solvePart2(input);
console.log('part 1:', result1);
console.log('part 2:', result2);