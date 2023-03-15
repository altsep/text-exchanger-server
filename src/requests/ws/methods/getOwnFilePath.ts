import path = require('path');
import constants = require('../../../constants');

const { basedir, pagesDirName, creatorTextFileName, guestTextFileName } = constants;

export = function getOwnFilePath(pageName: string, isCreator: string): string {
  return path.join(basedir, pagesDirName, pageName, isCreator ? creatorTextFileName : guestTextFileName);
};
