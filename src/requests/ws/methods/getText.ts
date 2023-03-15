import fs = require('fs');
import path = require('path');
import constants = require('../../../constants');

const { basedir, pagesDirName, creatorTextFileName, guestTextFileName } = constants;

export = function getText(
  this: {
    sendFormatted: (type: string, payload: unknown) => void;
    waitOther: (data) => void;
  },
  data: { pageName: string }
): void {
  const { pageName } = data;
  const files = [creatorTextFileName, guestTextFileName];
  const [creatorData, guestData] = files.map((file) =>
    fs.readFileSync(path.join(basedir, pagesDirName, pageName, file), {
      encoding: 'utf-8',
    })
  );
  this.sendFormatted('get-text', { creatorData, guestData });
  this.waitOther(data);
};
