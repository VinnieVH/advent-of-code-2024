import { getInputValues } from "../../utils/helpers";


// Part 1

enum ReportState {
    Safe,
    Unsafe
}

interface Reading {
  level: number[];
  report: ReportState;
}

const isSafeSequence = (numbers: number[]): ReportState => {
  if (numbers.length < 2) return ReportState.Safe;
  
  const isIncreasing = numbers[1] > numbers[0];
  
  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];
    
    if (isIncreasing) {
      if (diff <= 0 || diff < 1 || diff > 3) return ReportState.Unsafe;
    } else {
      if (diff >= 0 || Math.abs(diff) < 1 || Math.abs(diff) > 3) return ReportState.Unsafe;
    }
  }
  
  return ReportState.Safe;
}

const countSafeReadings = (readings: Reading[]): number => {
  return readings.filter(reading => reading.report === ReportState.Safe).length;
}

const input = getInputValues('./src/day-2/input.txt');

const linesPart1 = input.map(line => {
    const numbers = line.trim().split(' ').map(Number);

    return {
        level: numbers,
        report: isSafeSequence(numbers)
    };
}).filter(reading => reading.level.length > 0);

const resultPart1 = countSafeReadings(linesPart1);
console.log(resultPart1);

// Part 2

const canBeMadeSafe = (numbers: number[]): boolean => {
  if (numbers.length < 3) return false;
  
  for (let i = 0; i < numbers.length; i++) {
    const modifiedSequence = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
    if (isSafeSequence(modifiedSequence) === ReportState.Safe) {
      return true;
    }
  }

  return false;
}

const linesPart2 = input.map(line => {
    const numbers = line.trim().split(' ').map(Number);
    const initialCheck = isSafeSequence(numbers);

    return {
        level: numbers,
        report: initialCheck === ReportState.Safe || canBeMadeSafe(numbers) ? ReportState.Safe : ReportState.Unsafe
    };
}).filter(reading => reading.level.length > 0);

const resultPart2 = countSafeReadings(linesPart2);
console.log(resultPart2);