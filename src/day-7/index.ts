import { getInputValues } from "../../utils/helpers";

enum Operator {
  ADD = '+',
  MULTIPLY = '*',
  CONCATENATE = '||'
}

type Expression = {
  numbers: number[];
  target: number;
}

type OperatorArray = Operator[];

const parseLine = (line: string): Expression => {
  const [targetStr, numbersStr] = line.split(':');
  return {
    target: parseInt(targetStr),
    numbers: numbersStr.trim().split(' ').map(n => parseInt(n))
  };
};

const evaluateExpression = (numbers: number[], operators: OperatorArray): number => {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNum = numbers[i + 1];
    switch (operator) {
      case Operator.ADD:
        result += nextNum;
        break;
      case Operator.MULTIPLY:
        result *= nextNum;
        break;
      case Operator.CONCATENATE:
        result = parseInt(`${result}${nextNum}`);
        break;
    }
  }
  return result;
};

// Generator functions use function* syntax to create iterators
// They can pause execution using 'yield' and resume later
const generateOperatorsBase = function* (
  length: number, 
  availableOperators: Operator[]
): Generator<OperatorArray> {
  if (length === 0) {
    yield [];
    return;
  }
  
  for (const subCombo of generateOperatorsBase(length - 1, availableOperators)) {
    for (const operator of availableOperators) {
      yield [...subCombo, operator];
    }
  }
};

const generateOperators = (length: number): Generator<OperatorArray> => 
  generateOperatorsBase(length, [Operator.ADD, Operator.MULTIPLY]);

const generateOperatorsPart2 = (length: number): Generator<OperatorArray> => 
  generateOperatorsBase(length, [Operator.ADD, Operator.MULTIPLY, Operator.CONCATENATE]);

const canMakeTarget = (
  numbers: number[], 
  target: number,
  operatorGenerator: (length: number) => Generator<OperatorArray>
): boolean => {
  const operatorsNeeded = numbers.length - 1;
  
  for (const operators of operatorGenerator(operatorsNeeded)) {
    if (evaluateExpression(numbers, operators) === target) {
      return true;
    }
  }
  return false;
};

const canMakeTargetPart1 = (numbers: number[], target: number): boolean => 
  canMakeTarget(numbers, target, generateOperators);

const canMakeTargetPart2 = (numbers: number[], target: number): boolean => 
  canMakeTarget(numbers, target, generateOperatorsPart2);

const solve = (
  checkFunction: (numbers: number[], target: number) => boolean
): number => {
  const lines = getInputValues("src/day-7/input.txt");
  
  return lines
    .filter(line => line.length > 0)
    .map(parseLine)
    .reduce((sum, { numbers, target }) => 
      checkFunction(numbers, target) ? sum + target : sum, 
    0);
};

const solvePart1 = (): number => solve(canMakeTargetPart1);
const solvePart2 = (): number => solve(canMakeTargetPart2);

// Run both parts with timing
const runWithTiming = (part: number, solveFn: () => number) => {
  console.log(`Part ${part}:`);
  console.time(`Part ${part} Time`);
  console.log(solveFn());
  console.timeEnd(`Part ${part} Time`);
};

runWithTiming(1, solvePart1);
runWithTiming(2, solvePart2);