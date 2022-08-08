const fs = require('fs/promises');
const path = require('path');
const { __basedir, pagesDirName, msInAWeek } = require('../constants');

module.exports = async function clearOutdatedEntries() {
  try {
    const pages = await fs.readdir(path.join(__basedir, pagesDirName));
    if (pages.length > 0) {
      const currentDate = Date.now();
      pages.forEach(async (pageName) => {
        try {
          const data = await fs.readFile(
            path.join(__basedir, pagesDirName, pageName, 'info.json'),
            'utf-8'
          );
          const { creator, date } = JSON.parse(data);
          if (!creator || !date)
            removeDir('Missing property', __basedir, pagesDirName, pageName);
          else if (currentDate - date > msInAWeek)
            removeDir(
              "Page hasn't been active for over a week",
              __basedir,
              pagesDirName,
              pageName
            );
        } catch (e) {
          removeDir(e.message, __basedir, pagesDirName, pageName);
        }
      });
    }
  } catch (e) {
    console.log(e);
    console.log('Attempting to create a pages directory...');
    makeDir(__basedir, pagesDirName);
  }
};

async function makeDir(...pathArgs) {
  try {
    await fs.mkdir(path.join(...pathArgs));
    console.log(`${pathArgs[pathArgs.length - 1]} created in ${pathArgs[0]}`);
  } catch (e) {
    console.log(e);
  }
}

async function removeDir(message, ...pathArgs) {
  try {
    await fs.rm(path.join(...pathArgs), {
      recursive: true,
    });
    console.log(
      `Removed page ${pathArgs[pathArgs.length - 1]}: ${message || ''}`
    );
  } catch (e) {
    console.log(e);
  }
}
