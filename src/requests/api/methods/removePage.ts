const fs = require('fs');
const path = require('path');
const { __basedir, pagesDirName } = require('../../../constants');

module.exports = function removePage(req, res, next) {
  const pagePath = req.body;
  const pageDirPath = path.join(__basedir, pagesDirName, pagePath);
  fs.rm(pageDirPath, { recursive: true }, (err) => {
    if (err) {
      next(err);
    } else {
      res.send('Page removed');
    }
  });
};
