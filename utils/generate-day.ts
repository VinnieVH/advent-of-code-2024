import fs from 'fs';
import path from 'path';

// Get day number from command line argument
const day = process.argv[2];

if (!day) {
    console.error('Please provide a day number');
    process.exit(1);
}

const folderName = `day-${day}`;

// Define the folder path
const folderPath = path.join(__dirname, '..', 'src', folderName);

// Template for index.ts
const indexTemplate = `
import { getInputValues } from '../../utils/helpers';

const input = getInputValues('src/${folderName}/input.txt');
console.log(input);
`;

try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created directory: ${folderPath}`);
    }

    // Create explanation.txt
    const explanationPath = path.join(folderPath, 'explanation.txt');
    if (!fs.existsSync(explanationPath)) {
        fs.writeFileSync(explanationPath, '');
        console.log(`Created file: ${explanationPath}`);
    }

    // Create index.ts
    const indexPath = path.join(folderPath, 'index.ts');
    if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, indexTemplate.trim());
        console.log(`Created file: ${indexPath}`);
    }

    console.log('Day generation completed successfully!');
} catch (error) {
    console.error('Error generating day:', error);
    process.exit(1);
}