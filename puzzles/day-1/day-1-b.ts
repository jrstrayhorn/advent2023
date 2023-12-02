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
  const regExpNumberStringCheck =
    /^(one|two|three|four|five|six|seven|eight|nine)/i;
  let total = 0;
  data.forEach((d, idx) => {
    if (!d) return;
    const dataStringAsArray = d.split('');
    const numArray: string[] = [];
    for (let index = 0; index < dataStringAsArray.length; index++) {
      if (!isNaN(+dataStringAsArray[index])) {
        // it's a number add to numArray and continue
        numArray.push(dataStringAsArray[index]);
        continue;
      }
      // check for number string match at beginning of substring
      const match = d.substring(index).match(regExpNumberStringCheck);
      if (match) {
        // match word is in the first capturing group
        const matchedWord = match[1];
        numArray.push(NUMBER_TO_NUMBER_MAP[matchedWord]);
      }
    }
    const firstNum = numArray[0];
    // going -2 b/c of /r that is at the end of the strings...
    const lastNum = numArray[numArray.length - 2];
    // coerce string to number and add to total
    total += +`${firstNum + lastNum}`;
  });
  return total;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
