import { getInputValues } from "../../utils/helpers";

const input = getInputValues('./src/day-3/input.txt');

const mulRegex = /mul\((\d+),(\d+)\)/g;

const extractMultiplicationsPartOne = (input: string[]) => {
    const multiplications: Array<{x: number, y: number}> = [];
    
    input.forEach(line => {
        const matches = line.matchAll(mulRegex);
        Array.from(matches).forEach(match => {
            multiplications.push({
                x: parseInt(match[1]),
                y: parseInt(match[2])
            });
        });
    });
    
    return multiplications;
};

const multiplicationsPartOne = extractMultiplicationsPartOne(input);

let resultPartOne = 0;

multiplicationsPartOne.forEach(mp => resultPartOne += mp.x * mp.y);
console.log(resultPartOne);

// Part 2
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

enum Type {
    do,
    dont,
    mul
}

interface BaseOperation {
    type: Type;
    index: number;
}

interface DoOperation extends BaseOperation {
    type: Type.do;
}

interface DontOperation extends BaseOperation {
    type: Type.dont;
}

interface MulOperation extends BaseOperation {
    type: Type.mul;
    x: number;
    y: number;
}

type Operation = DoOperation | DontOperation | MulOperation;

const extractMultiplicationsPartTwo = (input: string[]) => {
    const multiplications: Array<{x: number, y: number}> = [];
    
    // Merge input into single string
    const text = input.join('');
    
    // Get all operation positions
    const doMatches = Array.from(text.matchAll(doRegex));
    const dontMatches = Array.from(text.matchAll(dontRegex));
    const mulMatches = Array.from(text.matchAll(mulRegex));
    
    // Create array of operations with their positions
    const operations: Operation[] = [
        ...doMatches.map(m => ({ type: Type.do, index: m.index! } as DoOperation)),
        ...dontMatches.map(m => ({ type: Type.dont, index: m.index! } as DontOperation)),
        ...mulMatches.map(m => ({ 
            type: Type.mul, 
            index: m.index!,
            x: parseInt(m[1]),
            y: parseInt(m[2])
        } as MulOperation))
    ].sort((a, b) => a.index - b.index);
    
    // Process operations in order
    let isEnabled = true;
    operations.forEach(op => {
        switch (op.type) {
            case Type.do:
                isEnabled = true;
                break;
            case Type.dont:
                isEnabled = false;
                break;
            case Type.mul:
                if (isEnabled) {
                    multiplications.push({
                        x: op.x!,
                        y: op.y!
                    });
                }
                break;
        }
    });

    return multiplications;
};

const multiplicationsPartTwo = extractMultiplicationsPartTwo(input);

let resultPartTwo = 0;

multiplicationsPartTwo.forEach(mp => resultPartTwo += mp.x * mp.y);
console.log(resultPartTwo);