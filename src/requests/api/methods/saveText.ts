const fs = require('fs');
const path = require('path');
const {
  __basedir,
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('../../../constants');

module.exports = function saveText(req, res, next) {
  const { pageName, isCreator, text } = req.body;
  const filePath = path.join(
    __basedir,
    pagesDirName,
    pageName,
    isCreator ? creatorTextFileName : guestTextFileName
  );
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      next(err);
      res.send({ err: "Couldn't write file" });
    } else {
      res.send({ message: 'Text saved' });
    }
  });
};
