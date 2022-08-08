const fs = require('fs');
const path = require('path');
const { __basedir, pagesDirName } = require('../../../constants');

module.exports = function updateInfo(req, res, next) {
  const { pageName, info } = req.body;
  fs.writeFile(
    path.join(__basedir, pagesDirName, pageName, 'info.json'),
    JSON.stringify(info),
    (err) => {
      if (err) {
        next(err);
        res.status(500).send("Couldn't write file");
      } else {
        res.send('Info updated');
      }
    }
  );
};
