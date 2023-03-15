import fs = require('fs');
import getOwnFilePath = require('./getOwnFilePath');

export = function saveText(data): void {
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
