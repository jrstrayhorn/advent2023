import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { ONE_OR_MORE_SPACES } from './day-4.interface.ts';

export function getPointsFromMatchingNumbers(matchTotal: number): number {
  return Math.pow(2, matchTotal - 1);
}

export async function day4a(dataPath?: string) {
  let totalPoints = 0;
  const data = await readData(dataPath);
  data.forEach((d) => {
    if (!d) return;
    const dataSplit = d.split(/:|\|/);

    let matchingNumberTotal = 0;

    const winningNumbers = dataSplit[1];
    const myNumbers = dataSplit[2];

    const winningNumbersSet = new Set<string>();
    winningNumbers
      .split(ONE_OR_MORE_SPACES)
      .forEach((n) => !!n && winningNumbersSet.add(n));

    myNumbers.split(ONE_OR_MORE_SPACES).forEach((n) => {
      if (winningNumbersSet.has(n)) {
        matchingNumberTotal++;
      }
    });

    if (matchingNumberTotal > 0) {
      const cardPoints = getPointsFromMatchingNumbers(matchingNumberTotal);
      totalPoints += cardPoints;
    }
  });
  return totalPoints;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
