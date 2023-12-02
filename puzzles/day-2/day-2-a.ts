import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { CubeTotals } from './day-2.interface.ts';

export const POSSIBLE_TOTALS: CubeTotals = {
  red: 12,
  green: 13,
  blue: 14,
};

export function isGamePossible(
  actualTotals: CubeTotals,
  possibleTotals: CubeTotals
): boolean {
  return (
    actualTotals.red <= possibleTotals.red &&
    actualTotals.green <= possibleTotals.green &&
    actualTotals.blue <= possibleTotals.blue
  );
}

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  let gameIdTotal = 0;
  data.forEach((d) => {
    if (!d) return;
    const gameInfo = d.split(':');
    const gameId = gameInfo[0].split(' ')[1];
    const diceSets = gameInfo[1].split(';');

    // assume true until proven otherwise...
    let isGameIdPossible = true;
    for (let index = 0; index < diceSets.length; index++) {
      // break out loop earlier if any dice set for the game
      // isn't possible
      if (!isGameIdPossible) break;
      const set = diceSets[index];
      const actualTotals: CubeTotals = {
        red: 0,
        blue: 0,
        green: 0,
      };
      const cubeInfos = set.trim().split(', ');
      for (let idx = 0; idx < cubeInfos.length; idx++) {
        const cubeInfo = cubeInfos[idx].split(' ');
        const totalInfo = cubeInfo[0];
        const colorInfo = cubeInfo[1];
        if (colorInfo === 'blue') {
          actualTotals.blue += +totalInfo;
        } else if (colorInfo === 'red') {
          actualTotals.red += +totalInfo;
        } else if (colorInfo === 'green') {
          actualTotals.green += +totalInfo;
        }
      }
      if (!isGamePossible(actualTotals, POSSIBLE_TOTALS)) {
        // this game isn't possible; break out cube check early
        isGameIdPossible = false;
        break;
      }
    }
    if (isGameIdPossible) {
      gameIdTotal += +gameId;
    }
  });
  return gameIdTotal;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
