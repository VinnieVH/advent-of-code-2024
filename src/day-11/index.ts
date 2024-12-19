import { getInputValues } from '../../utils/helpers';

const input = getInputValues('src/day-11/input.txt');

// Types and enums
enum TransformationRule {
  ZERO_TO_ONE,
  EVEN_DIGITS_SPLIT,
  MULTIPLY_BY_2024
}

type Stone = {
  value: number;
};

// Helper functions
const getDigitCount = (num: number): number => {
  return num.toString().length;
};

const splitNumber = (num: number): [number, number] => {
  const numStr = num.toString();
  const mid = Math.floor(numStr.length / 2);
  const left = parseInt(numStr.slice(0, mid));
  const right = parseInt(numStr.slice(mid));
  return [left, right];
};

const determineRule = (stone: Stone): TransformationRule => {
  if (stone.value === 0) {
    return TransformationRule.ZERO_TO_ONE;
  }
  if (getDigitCount(stone.value) % 2 === 0) {
    return TransformationRule.EVEN_DIGITS_SPLIT;
  }
  return TransformationRule.MULTIPLY_BY_2024;
};

const transformStone = (stone: Stone): Stone[] => {
  const rule = determineRule(stone);

  switch (rule) {
    case TransformationRule.ZERO_TO_ONE:
      return [{ value: 1 }];
    case TransformationRule.EVEN_DIGITS_SPLIT: {
      const [left, right] = splitNumber(stone.value);
      return [{ value: left }, { value: right }];
    }
    case TransformationRule.MULTIPLY_BY_2024:
      return [{ value: stone.value * 2024 }];
    default:
      return [stone];
  }
};

const blink = (stones: Stone[]): Stone[] => {
  return stones.flatMap(stone => transformStone(stone));
};

const countStonesAfterBlinks = (initialStones: number[], blinks: number): number => {
  let stones: Stone[] = initialStones.map(value => ({ value }));
  
  for (let i = 0; i < blinks; i++) {
    stones = blink(stones);
  }

  return stones.length;
};

const parseInput = (input: string[]): number[] => {
  return input[0].split(' ').map(num => parseInt(num, 10));
};

const initialStones = parseInput(input);

// Calculate result
const result = countStonesAfterBlinks(initialStones, 25);

console.log(`Part 1: ${result}`);