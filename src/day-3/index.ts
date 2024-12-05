import { getInputValues } from "../../utils/helpers";

const input = getInputValues('./src/day-3/input.txt');

const mulRegex = /mul\((\d+),(\d+)\)/g;

const extractMultiplications = (input: string[]) => {
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

const multiplications = extractMultiplications(input);

let total = 0;

multiplications.forEach(mp => total += mp.x * mp.y);
console.log(total);