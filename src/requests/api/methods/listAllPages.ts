const fs = require('fs');
const path = require('path');
const { __basedir, pagesDirName } = require('../../../constants');

module.exports = function listAllPages(req, res, next) {
  fs.readdir(path.join(__basedir, pagesDirName), (err, pages) => {
    if (err) next(err);
    else res.send(pages);
  });
};
