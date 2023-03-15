const fs = require('fs');
const getOtherFilePath = require('./getOtherFilePath');

module.exports = function getTextOther(data) {
  const { pageName, isCreator } = data;
  const filePath = getOtherFilePath(pageName, isCreator);
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileData) => {
    if (err) {
      next(err);
      this.sendFormatted('error', {
        status: 500,
        message: "Couldn't find data",
      });
    } else {
      this.sendFormatted('other-text', { text: fileData });
      this.sendFormatted('system', 'Text received');
    }
  });
};
