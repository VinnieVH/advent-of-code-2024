import { getInputValues } from "../../utils/helpers";

type Rule = {
  before: number;
  after: number;
};

export const solvePrintQueue = (): number => {
  const input = getInputValues("src/day-5/input.txt").join("\n");
  
  const [rulesSection, updatesSection] = input.trim().split('\n\n');

  const rules: Rule[] = rulesSection.split('\n').map(rule => {
    const [before, after] = rule.split('|').map(Number);
    return { before, after };
  });

  const updates = updatesSection.split('\n').map(update => 
    update.split(',').map(Number)
  );

  const isValidOrder = (update: number[]): boolean => {
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

  return updates
    .filter(isValidOrder)
    .reduce((sum, update) => {
      const middleIndex = Math.floor(update.length / 2);
      return sum + update[middleIndex];
    }, 0);
};

const result = solvePrintQueue();
console.log(result);