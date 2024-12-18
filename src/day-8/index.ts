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

const isCollinear = (p1: Point, p2: Point, x: number, y: number): boolean => {
  // Using cross product to check if points are collinear
  const crossProduct = (p2.x - p1.x) * (y - p1.y) - (p2.y - p1.y) * (x - p1.x);
  return Math.abs(crossProduct) < 1e-10;
};

const findAntinodes = (points: Point[], bounds: GridBounds): Set<string> => {
  const antinodes = new Set<string>();
  
  // Group by exact frequency
  const frequencyGroups = new Map<string, Point[]>();
  points.forEach(point => {
    if (!frequencyGroups.has(point.frequency)) {
      frequencyGroups.set(point.frequency, []);
    }
    frequencyGroups.get(point.frequency)?.push(point);
  });

  // For each frequency group with at least 2 antennas
  frequencyGroups.forEach((sameFreqPoints) => {
    if (sameFreqPoints.length < 2) return;

    // Check each pair
    for (let i = 0; i < sameFreqPoints.length; i++) {
      for (let j = i + 1; j < sameFreqPoints.length; j++) {
        const p1 = sameFreqPoints[i];
        const p2 = sameFreqPoints[j];

        // Calculate vector between antennas
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Unit vector
        const ux = dx / dist;
        const uy = dy / dist;

        // Check points at distance D before p1 and after p2
        // where D is the distance between the antennas
        const checkPoint = (x: number, y: number) => {
          if (x < 0 || x >= bounds.width || y < 0 || y >= bounds.height) return;
          if (!Number.isInteger(x) || !Number.isInteger(y)) return;

          const dist1 = Math.sqrt((x - p1.x) ** 2 + (y - p1.y) ** 2);
          const dist2 = Math.sqrt((x - p2.x) ** 2 + (y - p2.y) ** 2);

          if (Math.abs(dist1 - 2 * dist2) < 1e-10 || Math.abs(dist2 - 2 * dist1) < 1e-10) {
            if (isCollinear(p1, p2, x, y)) {
              antinodes.add(`${Math.round(x)},${Math.round(y)}`);
            }
          }
        };

        // Check antinode positions
        checkPoint(p1.x - dx, p1.y - dy);  // Before p1
        checkPoint(p2.x + dx, p2.y + dy);  // After p2
      }
    }
  });

  return antinodes;
};

const solve = (input: string[]): number => {
  const { points, bounds } = parseInput(input);
  const antinodes = findAntinodes(points, bounds);
  return antinodes.size;
};

const input = getInputValues('src/day-8/input.txt');
console.log(solve(input));