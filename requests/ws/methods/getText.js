const fs = require('fs');
const path = require('path');
const {
  __basedir,
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('../../../constants');

module.exports = function getText(data) {
  const { pageName } = data;
  const files = [creatorTextFileName, guestTextFileName];
  const [creatorData, guestData] = files.map((file) =>
    fs.readFileSync(path.join(__basedir, pagesDirName, pageName, file), {
      encoding: 'utf-8',
    })
  );
  this.sendFormatted('get-text', { creatorData, guestData });
  this.waitOther(data);
};
