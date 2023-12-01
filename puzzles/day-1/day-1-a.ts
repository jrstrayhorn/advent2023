import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let total = 0;
  data.forEach((d) => {
    if (!d) return;
    // replacing letters w/ blanks
    const numArray = d.replace(/[a-z]/g, '').split('');
    const firstNum = numArray[0];
    // going -2 b/c of /r that is at the end of the strings...
    const lastNum = numArray[numArray.length - 2];
    // console.log(firstNum + lastNum);
    total += +`${firstNum + lastNum}`;
  });
  return total;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
