import { ONE_OR_MORE_SPACES, cleanData, readData } from '../../shared.ts';
import chalk from 'chalk';

export function doesBeatRaceRecord(
  holdTime: number,
  raceTime: number,
  recordDistance: number
): boolean {
  const goTime = raceTime - holdTime;
  const goDistance = goTime * holdTime;
  return goDistance > recordDistance;
}

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const dArr = [];
  data.forEach((d) => {
    if (!d) return;
    const cleandArr = cleanData(d).split(ONE_OR_MORE_SPACES);
    dArr.push(cleandArr);
  });

  const waysToWin = [];
  for (let raceIdx = 1; raceIdx < dArr[0].length; raceIdx++) {
    let minHoldTime: number | undefined;
    let maxHoldTime: number | undefined;
    const raceTime = +dArr[0][raceIdx];
    const recordDistance = +dArr[1][raceIdx];
    for (let holdTime = 1; holdTime < raceTime; holdTime++) {
      if (doesBeatRaceRecord(holdTime, raceTime, recordDistance)) {
        if (!minHoldTime || holdTime < minHoldTime) minHoldTime = holdTime;
        if (!maxHoldTime || holdTime > maxHoldTime) maxHoldTime = holdTime;
      }
    }
    waysToWin.push(maxHoldTime - minHoldTime + 1);
  }
  console.log(waysToWin);
  return waysToWin.reduce((a, b) => a * b);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
