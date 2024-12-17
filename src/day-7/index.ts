import { getInputValues } from "../../utils/helpers";

enum Operator {
  ADD = '+',
  MULTIPLY = '*'
}

type Expression = {
  numbers: number[];
  target: number;
}

type OperatorArray = Operator[];

// Evaluates expression left-to-right without operator precedence
const evaluateExpression = (numbers: number[], operators: OperatorArray): number => {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNum = numbers[i + 1];
    result = operator === Operator.ADD ? result + nextNum : result * nextNum;
  }
  return result;
};

// Generates all possible operator combinations
function* generateOperators(length: number): Generator<OperatorArray> {
  if (length === 0) {
    yield [];
    return;
  }
  
  for (const subCombo of generateOperators(length - 1)) {
    yield [...subCombo, Operator.ADD];
    yield [...subCombo, Operator.MULTIPLY];
  }
}

// Checks if any operator combination can produce the target value
const canMakeTarget = (numbers: number[], target: number): boolean => {
  const operatorsNeeded = numbers.length - 1;
  
  for (const operators of generateOperators(operatorsNeeded)) {
    if (evaluateExpression(numbers, operators) === target) {
      return true;
    }
  }
  return false;
};

// Parses a line into an Expression object
const parseLine = (line: string): Expression => {
  const [targetStr, numbersStr] = line.split(": ");
  return {
    target: parseInt(targetStr),
    numbers: numbersStr.split(" ").map(Number)
  };
};

const solve = (): number => {
  const lines = getInputValues("src/day-7/input.txt");
  
  return lines
    .filter(line => line.length > 0)
    .map(parseLine)
    .reduce((sum, { numbers, target }) => 
      canMakeTarget(numbers, target) ? sum + target : sum, 
    0);
};

console.time('Solving');
console.log(solve());
console.timeEnd('Solving');