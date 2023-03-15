const fs = require('fs');
const path = require('path');
const { __basedir } = require('../../../constants');

module.exports = function removeAllPages(req, res, next) {
  fs.readdir(pageDir, (err, files) => {
    err
      ? console.log(err)
      : files.forEach((file) =>
          fs.rm(
            path.join(__basedir, pageDir, file),
            { recursive: true },
            (err) => err && console.log(err)
          )
        );
    res.redirect('/');
  });
};
