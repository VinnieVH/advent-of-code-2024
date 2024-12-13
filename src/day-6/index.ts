import { getInputValues } from "../../utils/helpers";

type Coords = {
    xAxis: number;
    yAxis: number;
}

enum MovingDirection {
    Up,
    Down,
    Left,
    Right
}

const input = getInputValues('src/day-6/input.txt');
const visitedPositions = new Set<string>();

const getNextPosition = (currentPos: Coords, direction: MovingDirection): Coords => {
    switch (direction) {
        case MovingDirection.Up:
            return { xAxis: currentPos.xAxis, yAxis: currentPos.yAxis - 1 };
        case MovingDirection.Right:
            return { xAxis: currentPos.xAxis + 1, yAxis: currentPos.yAxis };
        case MovingDirection.Down:
            return { xAxis: currentPos.xAxis, yAxis: currentPos.yAxis + 1 };
        case MovingDirection.Left:
            return { xAxis: currentPos.xAxis - 1, yAxis: currentPos.yAxis };
    }
};

const turnRight = (direction: MovingDirection): MovingDirection => {
    switch (direction) {
        case MovingDirection.Up: return MovingDirection.Right;
        case MovingDirection.Right: return MovingDirection.Down;
        case MovingDirection.Down: return MovingDirection.Left;
        case MovingDirection.Left: return MovingDirection.Up;
    }
};

const isPositionOutOfBounds = (pos: Coords): boolean => {
    return pos.xAxis < 0 || pos.xAxis >= input[0].length ||
           pos.yAxis < 0 || pos.yAxis >= input.length;
};

const findStartingPosition = (): Coords => {
    for (let y = 0; y < input.length; y++) {
        const x = input[y].indexOf('^');
        if (x !== -1) {
            return { xAxis: x, yAxis: y };
        }
    }
};

const createPositionKey = (pos: Coords): string => {
    return `${pos.xAxis},${pos.yAxis}`;
};

const createStateKey = (pos: Coords, dir: MovingDirection): string => {
    return `${pos.xAxis},${pos.yAxis},${dir}`;
};

const simulateMove = (pos: Coords, dir: MovingDirection, grid: string[][]): { newPos: Coords, newDir: MovingDirection } => {
    const nextPos = getNextPosition(pos, dir);
    
    if (grid[nextPos.yAxis][nextPos.xAxis] === '#') {
        return { newPos: pos, newDir: turnRight(dir) };
    }
    
    return { newPos: nextPos, newDir: dir };
};

// Initialize starting position and direction
const startingPos = findStartingPosition();
let currentPosition: Coords = startingPos;
let currentDirection = MovingDirection.Up;

// Add initial position
visitedPositions.add(createPositionKey(currentPosition));

const calculateVisitedTiles = (): void => {
    let isOutside = false;
    
    while (!isOutside) {
        const nextPosition = getNextPosition(currentPosition, currentDirection);
        
        if (isPositionOutOfBounds(nextPosition)) {
            isOutside = true;
            break;
        }
        
        const { newPos, newDir } = simulateMove(currentPosition, currentDirection, input.map(row => row.split('')));
        currentPosition = newPos;
        currentDirection = newDir;
        
        visitedPositions.add(createPositionKey(currentPosition));
    }
};

const checksForLoop = (obstacleX: number, obstacleY: number): boolean => {
    const modifiedInput = input.map(row => row.split(''));
    modifiedInput[obstacleY][obstacleX] = '#';
    
    const visited = new Set<string>();
    let pos = findStartingPosition();
    let dir = MovingDirection.Up;
    
    while (true) {
        const stateKey = createStateKey(pos, dir);
        
        if (visited.has(stateKey)) {
            return true;
        }
        
        visited.add(stateKey);
        
        const nextPos = getNextPosition(pos, dir);
        
        if (isPositionOutOfBounds(nextPos)) {
            return false;
        }
        
        const { newPos, newDir } = simulateMove(pos, dir, modifiedInput);
        pos = newPos;
        dir = newDir;
    }
};

const findLoopPositions = (): number => {
    let loopCount = 0;
    
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            // Skip if position already has obstacle or is starting position
            if (input[y][x] === '#' || (x === startingPos.xAxis && y === startingPos.yAxis)) {
                continue;
            }
            
            if (checksForLoop(x, y)) {
                loopCount++;
            }
        }
    }
    
    return loopCount;
};

// Part 1
console.time('guard patrolling');
calculateVisitedTiles();
console.log('Part 1:', visitedPositions.size);
console.timeEnd('guard patrolling');

// Part 2
console.time('finding loops');
const loopPositions = findLoopPositions();
console.log('Part 2:', loopPositions);
console.timeEnd('finding loops');