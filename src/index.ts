import * as fs from 'fs';

const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const content = fs.readFileSync('day1.txt', 'utf-8');
const lines = content.split('\n');


function addFirstAndLastDigits(line: string): number {
    const numbers = Array.from(line).map((c: string) => parseInt(c));
    const integers = numbers.filter((n) => !isNaN(n));
    const singleTwoDigits = integers.slice(0, 1).concat(integers.slice(-1));
    return parseInt(singleTwoDigits.map((n) => n.toString()).join(''), 10);    
}

function getSumOfAllCalibrationValues(content: string, debug : boolean = false): number {
    const lines = content.split('\n');
    const calibrationValues = lines.map((line) => addFirstAndLastDigits(line));
    const sumOfAllCalibrationValues = calibrationValues.reduce((a, b) => a + b, 0);

    if (debug) {
        console.log(lines);
        console.log(calibrationValues);
        console.log(sumOfAllCalibrationValues);
    }

    return sumOfAllCalibrationValues
}

getSumOfAllCalibrationValues(example, true);
getSumOfAllCalibrationValues(content.split('\n').slice(0, 10).join('\n'), true);
console.log(getSumOfAllCalibrationValues(content));


// Part 2
console.log('Part 2');

const digitStringsToInts: { [name: string]: number; } = {"0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5":5, "6": 6, "7": 7, "8": 8, "9": 9, 
    "one": 1, "two": 2, "three": 3, "four": 4, "five":5, "six": 6, "seven": 7, "eight": 8, "nine": 9};

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

function* getAllSubStrings(line: string, reverse: boolean = false) {
    if (reverse) {
        line = line.split('').reverse().join('');
    }
    for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j < line.length + 1; j++) {
            yield !reverse ? line.slice(i, j) : line.slice(i, j).split('').reverse().join('');
        }
    }
}

function getFirstMatchingValue(strings: Iterable<string>): number {
    for (const s of strings) {
        if (digitStringsToInts.hasOwnProperty(s)) {
            return digitStringsToInts[s];
        }
    }
    return -1;
    //throw new Error('No matching value found');
}

function addTwoDigits(digit1: number, digit2: number): number {
    return parseInt([digit1.toString()].concat(digit2.toString()).join(''));
}

function getSumOfAllPartTwoCalibrationValues(content: string, debug : boolean = false): number {
    const lines = content.split('\n');
    const calibrationValues = lines.map(
        (line) => addTwoDigits(
            getFirstMatchingValue(getAllSubStrings(line)),
            getFirstMatchingValue(getAllSubStrings(line, true))
        )
    );
    const sumOfAllCalibrationValues = calibrationValues.reduce((a, b) => a + b, 0);

    if (debug) {
        console.log(lines);
        console.log(calibrationValues);
        console.log(sumOfAllCalibrationValues);
    }

    return sumOfAllCalibrationValues
}

const example2Line = example2.split('\n')[0];
console.log(Array.from(getAllSubStrings(example2Line)));
console.log(Array.from(getAllSubStrings(example2Line, true)));


const substrings = Array.from(getAllSubStrings(example2Line));
console.log(getFirstMatchingValue(getAllSubStrings(example2Line)));
console.log(getFirstMatchingValue(getAllSubStrings(example2Line, true)));



getSumOfAllPartTwoCalibrationValues(example2, true);
//getSumOfAllPartTwoCalibrationValues(content.split('\n').slice(0, 10).join('\n'), true);
console.log(getSumOfAllPartTwoCalibrationValues(content));
