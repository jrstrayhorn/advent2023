import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { CubeTotals } from './day-2.interface.ts';

export function getPowerFromMaxTotals(maxTotals: CubeTotals): number {
  return maxTotals.blue * maxTotals.red * maxTotals.green;
}

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  let powerTotal = 0;
  data.forEach((d) => {
    if (!d) return;
    const gameInfo = d.split(':');
    const diceSets = gameInfo[1].split(';');

    const maxTotals: CubeTotals = {
      red: 0,
      blue: 0,
      green: 0,
    };
    for (let index = 0; index < diceSets.length; index++) {
      const set = diceSets[index];
      const cubeInfos = set.trim().split(', ');
      for (let idx = 0; idx < cubeInfos.length; idx++) {
        const cubeInfo = cubeInfos[idx].split(' ');
        const totalInfo = cubeInfo[0];
        const cubeTotal = +totalInfo;
        const colorInfo = cubeInfo[1];
        if (colorInfo === 'blue' && cubeTotal > maxTotals.blue) {
          maxTotals.blue = cubeTotal;
        } else if (colorInfo === 'red' && cubeTotal > maxTotals.red) {
          maxTotals.red = cubeTotal;
        } else if (colorInfo === 'green' && cubeTotal > maxTotals.green) {
          maxTotals.green = cubeTotal;
        }
      }
    }

    const power = getPowerFromMaxTotals(maxTotals);
    powerTotal += power;
  });
  return powerTotal;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
