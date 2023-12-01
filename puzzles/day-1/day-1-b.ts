import { readData } from '../../shared.ts';
import chalk from 'chalk';

export const NUMBER_TO_NUMBER_MAP = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);
  const regExpLetterCheck = /[a-z]/g;
  const regExpNumberStringCheck =
    /(?:one|two|three|four|five|six|seven|eight|nine)/g;
  let total = 0;
  data.forEach((d, idx) => {
    if (!d) return;
    // replacing number string w/ numbers, letters w/ blanks
    const numArray = d
      // replacing number strings 'two' w/ numbers '2'
      .replace(
        regExpNumberStringCheck,
        (match) => NUMBER_TO_NUMBER_MAP[match] ?? ''
      )
      // replacing remaining letters w/ blanks
      .replace(regExpLetterCheck, '')
      // get array of number
      .split('');
    const firstNum = numArray[0];
    // going -2 b/c of /r that is at the end of the strings...
    const lastNum = numArray[numArray.length - 2];
    // console.log(numArray, firstNum + lastNum);
    // coerce string to number and add to total
    console.log(idx, numArray);
    total += +`${firstNum + lastNum}`;
  });
  return total;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
