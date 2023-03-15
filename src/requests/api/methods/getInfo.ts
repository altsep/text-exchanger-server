const fs = require('fs');
const path = require('path');
const { __basedir, pagesDirName } = require('../../../constants');

module.exports = function getInfo(req, res, next) {
  const pagePath = req.body;
  fs.readFile(
    path.join(__basedir, pagesDirName, pagePath, 'info.json'),
    { encoding: 'utf-8' },
    (err, file) => {
      if (err) {
        next(err);
        res
          .status(500)
          .send({ err: "Couldn't find data for the current path" });
      } else {
        res.send(file);
      }
    }
  );
};
