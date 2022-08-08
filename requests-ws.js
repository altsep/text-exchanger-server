const path = require('path');
const fs = require('fs');
const {
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('./constants');

function initRequestsWs(ws) {
  return { ws, ...requestsWs };
}

const requestsWs = {
  sendFormatted(type, payload) {
    this.ws.send(JSON.stringify({ type, payload }));
  },
  'save-text': function saveText(data) {
    const { pageName, isCreator, text } = data;
    const filePath = path.join(
      __dirname,
      pagesDirName,
      pageName,
      isCreator ? creatorTextFileName : guestTextFileName
    );
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        next(err);
        this.sendFormatted('error', { message: "Couldn't write file" });
      } else {
        this.sendFormatted('system', 'Text saved');
      }
    });
  },
  'get-text': function getText(data) {
    const { pageName } = data;
    const files = [creatorTextFileName, guestTextFileName];
    const [creatorData, guestData] = files.map((file) =>
      fs.readFileSync(path.join(__dirname, pagesDirName, pageName, file), {
        encoding: 'utf-8',
      })
    );
    this.sendFormatted('get-text', { creatorData, guestData });
    this.waitOther(data);
  },
  getOtherFilePath(pageName, isCreator) {
    return path.join(
      __dirname,
      pagesDirName,
      pageName,
      isCreator ? guestTextFileName : creatorTextFileName
    );
  },
  'text-other': function getTextOther(data) {
    const { pageName, isCreator } = data;
    const filePath = this.getOtherFilePath(pageName, isCreator);
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
  },
  waitOther(data) {
    const { pageName, isCreator } = data;
    const filePath = this.getOtherFilePath(pageName, isCreator);
    fs.watchFile(filePath, { interval: 500 }, (curr, prev) => {
      if (curr.mtimeMs > prev.mtimeMs) {
        this['text-other'](data);
      }
    });
  },
};

module.exports = initRequestsWs;
