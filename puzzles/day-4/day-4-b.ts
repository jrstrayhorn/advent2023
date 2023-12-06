import { ONE_OR_MORE_SPACES, readData } from '../../shared.ts';
import chalk from 'chalk';

export type ScratchcardCounts = {
  [card: number]: number;
};

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  const dataLen = data.length;
  const cardCounts: ScratchcardCounts = {};
  // init the card counts
  for (let index = 0; index < dataLen; index++) {
    if (index + 1 === data.length) break;
    cardCounts[index + 1] = 1;
  }
  data.forEach((d, idx) => {
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
      const cardNum = idx + 1;
      const currentCardCount = cardCounts[cardNum];
      if (currentCardCount) {
        for (let i = 0; i < currentCardCount; i++) {
          // loop through card copies
          for (let j = 1; j <= matchingNumberTotal; j++) {
            // loop thorugh matching number to add card copies
            const cardToAddNum = cardNum + j;
            if (cardCounts[cardToAddNum]) {
              cardCounts[cardToAddNum] += 1;
            }
          }
        }
      }
    }
  });
  const scratchCardTotal = Object.values(cardCounts).reduce((a, b) => a + b, 0);
  return scratchCardTotal;
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
