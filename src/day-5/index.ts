import { getInputValues } from "../../utils/helpers";

type Rule = {
  before: number;
  after: number;
};

const parseInput = () => {
  const input = getInputValues("src/day-5/input.txt").join("\n");
  const [rulesSection, updatesSection] = input.trim().split('\n\n');

  const rules: Rule[] = rulesSection.split('\n').map(rule => {
    const [before, after] = rule.split('|').map(Number);
    return { before, after };
  });

  const updates = updatesSection.split('\n').map(update => 
    update.split(',').map(Number)
  );

  return { rules, updates };
};

const isValidOrder = (rules: Rule[], update: number[]): boolean => {
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const first = update[i];
      const second = update[j];
      
      const invalidRule = rules.find(rule => 
        rule.before === second && rule.after === first
      );
      
      if (invalidRule) return false;
    }
  }
  return true;
};

const sortUpdate = (rules: Rule[], update: number[]): number[] => {
  return [...update].sort((a, b) => {
    const aBeforeB = rules.some(rule => rule.before === a && rule.after === b);
    const bBeforeA = rules.some(rule => rule.before === b && rule.after === a);
    return bBeforeA ? 1 : aBeforeB ? -1 : 0;
  });
};

const solvePart1 = (): number => {
  const { rules, updates } = parseInput();

  return updates
    .filter(update => isValidOrder(rules, update))
    .reduce((sum, update) => {
      const middleIndex = Math.floor(update.length / 2);
      return sum + update[middleIndex];
    }, 0);
};

const solvePart2 = (): number => {
  const { rules, updates } = parseInput();

  return updates
    .filter(update => !isValidOrder(rules, update))
    .map(update => sortUpdate(rules, update))
    .reduce((sum, update) => {
      const middleIndex = Math.floor(update.length / 2);
      return sum + update[middleIndex];
    }, 0);
};

console.log('Part 1:', solvePart1());
console.log('Part 2:', solvePart2());