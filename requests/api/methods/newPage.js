const fs = require('fs');
const path = require('path');
const {
  __basedir,
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('../../../constants');

module.exports = function newPage(req, res, next) {
  const { pageName, info } = req.body;
  const newPageDirPath = path.join(__basedir, pagesDirName, pageName);
  const files = ['info.json', creatorTextFileName, guestTextFileName];
  fs.mkdir(newPageDirPath, { recursive: true }, (err) => {
    if (err) {
      next(err);
      res.status(500).send("Couldn't create directory");
    } else {
      files.forEach((file) =>
        fs.writeFile(
          path.join(newPageDirPath, file),
          file === 'info.json' ? JSON.stringify(info) : '',
          (err) => {
            if (err) {
              next(err);
              res.status(500).send("Couldn't write file");
            }
          }
        )
      );
      res.send('Page added: ' + pageName);
    }
  });
};
