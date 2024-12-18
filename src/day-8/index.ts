import { getInputValues } from "../../utils/helpers";

type Point = {
  x: number;
  y: number;
  frequency: string;
};

type GridBounds = {
  width: number;
  height: number;
};

type FrequencyGroups = Map<string, Point[]>;

// Input parsing
const parseInput = (lines: string[]): { points: Point[], bounds: GridBounds } => {
  const points: Point[] = [];
  
  lines.forEach((line, y) => {
    [...line].forEach((char, x) => {
      if (char !== '.') {
        points.push({ x, y, frequency: char });
      }
    });
  });

  return {
    points,
    bounds: {
      width: lines[0].length,
      height: lines.length
    }
  };
};

// Utility functions
const isCollinear = (p1: Point, p2: Point, x: number, y: number): boolean => {
  const crossProduct = (p2.x - p1.x) * (y - p1.y) - (p2.y - p1.y) * (x - p1.x);
  return Math.abs(crossProduct) < 1e-10;
};

const groupPointsByFrequency = (points: Point[]): FrequencyGroups => {
  const frequencyGroups = new Map<string, Point[]>();
  points.forEach(point => {
    if (!frequencyGroups.has(point.frequency)) {
      frequencyGroups.set(point.frequency, []);
    }
    frequencyGroups.get(point.frequency)?.push(point);
  });
  return frequencyGroups;
};

const isValidPoint = (x: number, y: number, bounds: GridBounds): boolean => {
  return x >= 0 && x < bounds.width && y >= 0 && y < bounds.height && 
         Number.isInteger(x) && Number.isInteger(y);
};

// Part 1 specific logic
const checkDistanceRatio = (p1: Point, p2: Point, x: number, y: number): boolean => {
  const dist1 = Math.sqrt((x - p1.x) ** 2 + (y - p1.y) ** 2);
  const dist2 = Math.sqrt((x - p2.x) ** 2 + (y - p2.y) ** 2);
  return Math.abs(dist1 - 2 * dist2) < 1e-10 || Math.abs(dist2 - 2 * dist1) < 1e-10;
};

const processPart1Points = (
  p1: Point, 
  p2: Point, 
  bounds: GridBounds, 
  antinodes: Set<string>
): void => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  const checkPoint = (x: number, y: number) => {
    if (!isValidPoint(x, y, bounds)) return;
    if (checkDistanceRatio(p1, p2, x, y) && isCollinear(p1, p2, x, y)) {
      antinodes.add(`${Math.round(x)},${Math.round(y)}`);
    }
  };

  checkPoint(p1.x - dx, p1.y - dy);  // Before p1
  checkPoint(p2.x + dx, p2.y + dy);  // After p2
};

// Part 2 specific logic
const processPart2Points = (
  p1: Point, 
  p2: Point, 
  bounds: GridBounds, 
  antinodes: Set<string>
): void => {
  for (let x = 0; x < bounds.width; x++) {
    for (let y = 0; y < bounds.height; y++) {
      if (isCollinear(p1, p2, x, y)) {
        antinodes.add(`${x},${y}`);
      }
    }
  }
};

const findAntinodes = (points: Point[], bounds: GridBounds, isPart2: boolean = false): Set<string> => {
  const antinodes = new Set<string>();
  const frequencyGroups = groupPointsByFrequency(points);

  frequencyGroups.forEach((sameFreqPoints) => {
    if (sameFreqPoints.length < 2) return;

    // For part 2, check if points themselves are collinear
    if (isPart2) {
      sameFreqPoints.forEach((point) => {
        for (let i = 0; i < sameFreqPoints.length; i++) {
          for (let j = i + 1; j < sameFreqPoints.length; j++) {
            if (isCollinear(sameFreqPoints[i], sameFreqPoints[j], point.x, point.y)) {
              antinodes.add(`${point.x},${point.y}`);
            }
          }
        }
      });
    }

    // Process point pairs
    for (let i = 0; i < sameFreqPoints.length; i++) {
      for (let j = i + 1; j < sameFreqPoints.length; j++) {
        const p1 = sameFreqPoints[i];
        const p2 = sameFreqPoints[j];

        if (isPart2) {
          processPart2Points(p1, p2, bounds, antinodes);
        } else {
          processPart1Points(p1, p2, bounds, antinodes);
        }
      }
    }
  });

  return antinodes;
};

// Main solve function
const solve = (input: string[], isPart2: boolean = false): number => {
  const { points, bounds } = parseInput(input);
  const antinodes = findAntinodes(points, bounds, isPart2);
  return antinodes.size;
};

// Execution
const input = getInputValues('src/day-8/input.txt');
const solvePart1 = (): number => solve(input);
const solvePart2 = (): number => solve(input, true);

const runWithTiming = (part: number, solveFn: () => number) => {
  console.log(`Part ${part}:`);
  console.time(`Part ${part} Time`);
  console.log(solveFn());
  console.timeEnd(`Part ${part} Time`);
};

runWithTiming(1, solvePart1);
runWithTiming(2, solvePart2);