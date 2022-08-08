const fs = require('fs');
const getOwnFilePath = require('./getOwnFilePath');

module.exports = function saveText(data) {
  const { pageName, isCreator, text } = data;
  const filePath = getOwnFilePath(pageName, isCreator);
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      next(err);
      this.sendFormatted('error', { message: "Couldn't write file" });
    } else {
      this.sendFormatted('system', 'Text saved');
    }
  });
};
