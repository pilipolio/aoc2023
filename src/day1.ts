import * as fs from 'fs';

const fileContent = fs.readFileSync('day1.txt', 'utf-8');
const content = fileContent.slice(0, 10)

const tmp = content.split('\n').forEach((line) => {
    Array.from(line).forEach((character) => { 
            // Do something with the character
    });
});

console.log(tmp);
