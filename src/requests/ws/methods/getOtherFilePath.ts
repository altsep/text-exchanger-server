const path = require('path');
const {
  __basedir,
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('../../../constants');

module.exports = function getOtherFilePath(pageName, isCreator) {
  return path.join(
    __basedir,
    pagesDirName,
    pageName,
    isCreator ? guestTextFileName : creatorTextFileName
  );
};
