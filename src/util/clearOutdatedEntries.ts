/* eslint-disable no-await-in-loop */
import fsPromises from 'fs/promises';
import path from 'path';
import { basedir, pagesDirName, msInAWeek } from '../constants';

async function makeDir(...pathArgs: string[]): Promise<void> {
  try {
    await fsPromises.mkdir(path.join(...pathArgs));
    console.log(`${pathArgs[pathArgs.length - 1]} created in ${pathArgs[0]}`);
  } catch (e) {
    console.log(e);
  }
}

async function removeDir(message: string, ...pathArgs: string[]): Promise<void> {
  try {
    await fsPromises.rm(path.join(...pathArgs), {
      recursive: true,
    });
    console.log(`Removed page ${pathArgs[pathArgs.length - 1]}: ${message}`);
  } catch (e) {
    console.log(e);
  }
}

export async function clearOutdatedEntries(): Promise<void> {
  try {
    const pages = await fsPromises.readdir(path.join(basedir, pagesDirName));
    if (pages.length > 0) {
      const currentDate = Date.now();
      // eslint-disable-next-line no-restricted-syntax
      for (const pageName of pages) {
        try {
          const data = await fsPromises.readFile(path.join(basedir, pagesDirName, pageName, 'info.json'), 'utf-8');
          const { creator, date } = JSON.parse(data) as { creator: string; date: number };
          if (!creator || !date || currentDate - date > msInAWeek) {
            const msg = !creator || !date ? 'Missing property' : "Page hasn't been active for over a week";
            await removeDir(msg, basedir, pagesDirName, pageName);
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Unexpected error';
          await removeDir(msg, basedir, pagesDirName, pageName);
        }
      }
    }
  } catch (e) {
    console.log(e);
    console.log('Attempting to create a pages directory...');
    await makeDir(basedir, pagesDirName);
  }
}
