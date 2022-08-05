const path = require('path');
const fs = require('fs');

function initRequests(
  ws,
  creatorTextFileName,
  guestTextFileName,
  pagesDirName
) {
  const sendFormatted = (type, payload) =>
    ws.send(JSON.stringify({ type, payload }));

  function saveText(data) {
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
        sendFormatted('error', { message: "Couldn't write file" });
      } else {
        sendFormatted('system', 'Text saved');
      }
    });
  }

  function getText(data) {
    const { pageName } = data;
    const files = [creatorTextFileName, guestTextFileName];
    const [creatorData, guestData] = files.map((file) =>
      fs.readFileSync(path.join(__dirname, pagesDirName, pageName, file), {
        encoding: 'utf-8',
      })
    );
    sendFormatted('get-text', { creatorData, guestData });
    waitOther(data);
  }

  const getOtherFilePath = (pageName, isCreator) =>
    path.join(
      __dirname,
      pagesDirName,
      pageName,
      isCreator ? guestTextFileName : creatorTextFileName
    );

  function getTextOther(data) {
    const { pageName, isCreator } = data;
    fs.readFile(
      getOtherFilePath(pageName, isCreator),
      { encoding: 'utf-8' },
      (err, fileData) => {
        if (err) {
          next(err);
          sendFormatted('error', {
            status: 500,
            message: "Couldn't find data",
          });
        } else {
          sendFormatted('other-text', { text: fileData });
          sendFormatted('system', 'Text received');
        }
      }
    );
  }

  function waitOther(data) {
    const { pageName, isCreator } = data;
    fs.watchFile(
      getOtherFilePath(pageName, isCreator),
      { interval: 500 },
      (curr, prev) => {
        if (curr.mtimeMs > prev.mtimeMs) {
          getTextOther(data);
        }
      }
    );
  }

  return { sendFormatted, saveText, getTextOther, getText };
}

module.exports = initRequests;
