import * as fs from 'fs';

const exampleGamesHistory = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const gamesHistory = fs.readFileSync('day2.txt', 'utf-8');

const bagConstraints: { [name: string]: number; } = {
    red: 12,
    green: 13,
    blue: 14
};

// 12 red cubes, 13 green cubes, and 14 blue cubes

type GameSet = {
    red: number;
    blue: number;
    green: number;

} & { [name: string]: number; }

// TODO
function isValidGameSet(set: GameSet): boolean {
    return Object.keys(set).every((color) => set[color] <= bagConstraints[color]);
}

type Game = {
    id: number;
    sets: GameSet[];
}

function parseSet(setString: string): GameSet {
    const colorAndCounts = setString.trim().split(',').map((color) => color.trim());
    const set: GameSet = { red: 0, blue: 0, green: 0 };

    colorAndCounts.forEach((colorCount) => {
        const [count, color] = colorCount.split(' ');
        set[color] = parseInt(count);
    });

    return set;
}

function parseGameLine(gameLine: string): { id: number, sets: GameSet[] } {
    const gameParts = gameLine.split(':');
    const gameId = parseInt(gameParts[0].replace('Game ', '').trim());
    const setStrings = gameParts[1].split(';');

    return { id: gameId, sets:setStrings.map(parseSet) };
}

const exampleGames = exampleGamesHistory.split('\n').map(parseGameLine);

const validExampleGames = exampleGames.filter((game) => {
    return game.sets.every(isValidGameSet)
});
const sumOfxampleGameIds = validExampleGames.reduce((sum, game) => sum + game.id, 0);
console.log(sumOfxampleGameIds);


const games = gamesHistory.split('\n').map(parseGameLine);

const validGames = games.filter((game) => {
    return game.sets.every(isValidGameSet)
});
const sumOfGameIds = validGames.reduce((sum, game) => sum + game.id, 0);
console.log(sumOfGameIds);



// Part 2
console.log('Part 2');

function getGamePower(game: Game): number {
    const maxRedCounts = Math.max(...game.sets.map((set) => set.red));
    const maxGreenCounts = Math.max(...game.sets.map((set) => set.green));
    const maxBlueCounts = Math.max(...game.sets.map((set) => set.blue));

    return maxRedCounts * maxGreenCounts * maxBlueCounts;
}

console.log(exampleGames.map(getGamePower).reduce((sum, power) => sum + power, 0));

const sumOfGamePowers = games.map(getGamePower).reduce((sum, power) => sum + power, 0);
console.log(sumOfGamePowers);