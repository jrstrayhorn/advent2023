import { readData } from '../../shared.ts';
import chalk from 'chalk';

export type NumberLocations = {
  [idx: string]: string;
};

const IS_SYMBOL = /[^0-9.]/dg;

const IS_NUMBER = /\d+/dg;

export function isSurroundBySymbol(
  id: string,
  myNum: string,
  symbolSet: Set<string>
): boolean {
  let isSurroundBySymbol = false;

  const idxSplit = id.split('|');
  const numXIdx = idxSplit[0];
  const numYIdx = idxSplit[1];

  // check top
  const topXIdx = +numXIdx - 1;
  for (let i = +numYIdx - 1; i < +numYIdx + myNum.length + 1; i++) {
    if (symbolSet.has(`${topXIdx}|${i}`)) {
      isSurroundBySymbol = true;
      break;
    }
  }

  if (!isSurroundBySymbol) {
    // check sides
    const sideXIdx = +numXIdx;
    if (
      symbolSet.has(`${sideXIdx}|${+numYIdx - 1}`) ||
      symbolSet.has(`${sideXIdx}|${+numYIdx + myNum.length}`)
    ) {
      isSurroundBySymbol = true;
    }
  }

  if (!isSurroundBySymbol) {
    // check bottom
    const bottomXIdx = +numXIdx + 1;
    for (let i = +numYIdx - 1; i < +numYIdx + myNum.length + 1; i++) {
      if (symbolSet.has(`${bottomXIdx}|${i}`)) {
        isSurroundBySymbol = true;
        break;
      }
    }
  }

  return isSurroundBySymbol;
}

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const symbolSet = new Set<string>();
  const numberByIdMap: NumberLocations = {};
  data.forEach((d, xIdx) => {
    if (!d) return;
    const cleand = d.replace(/\r/g, '');
    let match: any;
    while ((match = IS_SYMBOL.exec(cleand)) !== null) {
      const yIdx = match.indices[0][0];
      symbolSet.add(`${xIdx}|${yIdx}`);
    }
    while ((match = IS_NUMBER.exec(cleand)) !== null) {
      const yIdx = match.indices[0][0];
      numberByIdMap[`${xIdx}|${yIdx}`] = match[0];
    }
  });
  // console.log(Array.from(symbolSet.values()));
  // console.log(numberByIdMap);
  let partNumTotal = 0;
  for (const idx in numberByIdMap) {
    if (Object.prototype.hasOwnProperty.call(numberByIdMap, idx)) {
      const myNum = numberByIdMap[idx];
      if (isSurroundBySymbol(idx, myNum, symbolSet)) {
        // this is a part number so add up
        // console.log(myNum);
        partNumTotal += +myNum;
      }
    }
  }
  return partNumTotal;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
