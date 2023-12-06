import { readFile } from 'fs/promises';

export const ONE_OR_MORE_SPACES = /\s+/;

export async function readData(path?: string) {
  const fileName = path || process.argv[2];
  const data = (await readFile(fileName)).toString().split('\n');
  return data;
}

/**
 * Removes the carriage return /r from the end of the string
 */
export function cleanData(data: string) {
  return data.replace(/\r/g, '');
}
