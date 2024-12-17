# Advent of Code 2024

This repository contains my solutions for the [Advent of Code 2024](https://adventofcode.com/2024/) challenges. Advent of Code is an annual coding event that runs from December 1st to December 25th, where participants solve daily programming puzzles.

## Project Overview

This project is built using TypeScript and Node.js to solve the daily challenges. Each day's solution is organized in its own directory with corresponding input files and solution implementations.

## Tech Stack

- TypeScript
- Node.js
- PNPM (Package Manager)

## Project Structure

```
advent-of-code-2024/
├── src/
│ └── day-XX/ # Solutions for each day
    └── explanation.txt # Explanation for the day's puzzle
│   └── input.txt # Input data for the day's puzzle
│   └── index.ts # Solution implementation
├── utils/
│ └── helpers.ts # Shared utility functions
├── tsconfig.json # TypeScript configuration
└── package.json # Project dependencies
```

## Getting Started

1. Clone the repository: 

    ```bash
    git clone https://github.com/[your-username]/advent-of-code-2024.git
    cd advent-of-code-2024
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Run a specific day's solution:

    ```bash
    pnpm ts-node src/dayXX/index.ts
    ```


## Solutions

Each day's solution is contained in its own directory under `src/`. The solutions are organized by day number (01-25).

## Utility Functions

The project includes helper functions for common operations like reading input files:

```typescript
import { getInputValues } from '../utils/helpers';
// Usage example
const input = getInputValues('path/to/input.txt');
```

## Progress Tracking ⭐⭐

- [x] Day 1 ⭐⭐
- [x] Day 2 ⭐⭐
- [x] Day 3 ⭐⭐
- [x] Day 4 ⭐⭐
- [x] Day 5 ⭐⭐
- [x] Day 6 ⭐⭐
- [x] Day 7 ⭐
- [ ] ...
- [ ] Day 25

## About Advent of Code

Advent of Code is an annual event created by Eric Wastl. It consists of 25 daily programming puzzles released each day from December 1st through December 25th. The puzzles can be solved in any programming language and provide a fun way to improve your problem-solving skills.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Vincent Van Herreweghe

---