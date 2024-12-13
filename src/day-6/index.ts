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

const visitedPositions = new Set<string>();

// Find starting position more efficiently
let startX = 0, startY = 0;
for (let y = 0; y < input.length; y++) {
    const x = input[y].indexOf('^');
    if (x !== -1) {
        startX = x;
        startY = y;
        break;
    }
}

let currentPosition: Coords = { xAxis: startX, yAxis: startY };
let currentDirection = MovingDirection.Up;

// Add initial position
visitedPositions.add(`${currentPosition.xAxis},${currentPosition.yAxis}`);

const calculateVisitedTiles = (): void => {
    let isOutside = false;
    
    while (!isOutside) {
        // Get next position
        const nextPosition: Coords = getNextPosition({ 
            xAxis: currentPosition.xAxis, 
            yAxis: currentPosition.yAxis
        }, currentDirection);
        
        // Check if guard has left the area
        if (nextPosition.xAxis < 0 || nextPosition.xAxis >= input[0].length ||
            nextPosition.yAxis < 0 || nextPosition.yAxis >= input.length) {
            isOutside = true;
            break;
        }
        
        // Check if next position is valid (not an object)
        if (input[nextPosition.yAxis][nextPosition.xAxis] === '#') {
            currentDirection = turnRight(currentDirection);
        } else {
            currentPosition = nextPosition;
            visitedPositions.add(`${currentPosition.xAxis},${currentPosition.yAxis}`);
        }
    }
}

console.time('guard patrolling');
calculateVisitedTiles();
console.log(visitedPositions.size);
console.timeEnd('guard patrolling');