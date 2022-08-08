const fs = require('fs');
const getOtherFilePath = require('./getOtherFilePath');

module.exports = function waitOther(data) {
  const { pageName, isCreator } = data;
  const filePath = getOtherFilePath(pageName, isCreator);
  fs.watchFile(filePath, { interval: 500 }, (curr, prev) => {
    if (curr.mtimeMs > prev.mtimeMs) {
      this['other-text'](data);
    }
  });
};
