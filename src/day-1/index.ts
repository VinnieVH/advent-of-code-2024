import { getInputValues } from "../../utils/helpers";

const input = getInputValues('./src/day-1/input.txt');

const lists: number[][] = [[], []];

input.forEach(line => {
    const [first, second] = line.trim().split(/\s+/).map(Number);
    lists[0].push(first);
    lists[1].push(second);
});

// Part 1

lists.forEach(x => x.sort((a,b) => a - b));

let resultPart1 = 0;

for (let index = 0; index < lists[0].length; index++) {
    resultPart1 += Math.abs(lists[0][index] - lists[1][index]);
}

console.log(resultPart1);

// Part 2

const frequencyMap = new Map<number, number>();

lists[0].forEach(num => {
    frequencyMap.set(num, 0);
});

lists[1].forEach(num => {
    if (frequencyMap.has(num)) {
        frequencyMap.set(num, frequencyMap.get(num)! + 1);
    }
});

let resultPart2 = 0;

frequencyMap.forEach((count, num) => {
    resultPart2 += num * count;
});

console.log(resultPart2);


