const fs = require('fs');
const path = require('path');
const {
  __basedir,
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('../../../constants');

module.exports = function getTextOther(req, res, next) {
  const { pageName, isCreator } = req.body;
  fs.readFile(
    path.join(
      __basedir,
      pagesDirName,
      pageName,
      isCreator ? guestTextFileName : creatorTextFileName
    ),
    { encoding: 'utf-8' },
    (err, file) => {
      if (err) {
        next(err);
        res.status(500).send({ err: "Couldn't find data" });
      } else {
        res.send({ text: file });
      }
    }
  );
};
