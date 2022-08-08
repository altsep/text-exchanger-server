const path = require('path');
const {
  __basedir,
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('../../../constants');

module.exports = function getOwnFilePath(pageName, isCreator) {
  return path.join(
    __basedir,
    pagesDirName,
    pageName,
    isCreator ? creatorTextFileName : guestTextFileName
  );
};
