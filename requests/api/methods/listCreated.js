const fs = require('fs');
const path = require('path');
const { __basedir, pagesDirName } = require('../../../constants');

module.exports = function listCreated(req, res, next) {
  const userId = req.body;
  fs.readdir(path.join(__basedir, pagesDirName), (err, pages) => {
    if (err) {
      next(err);
      res
        .status(500)
        .send({
          err: "Couldn't read the pages directory, attempting to create one",
        });
      fs.mkdir(path.join(__basedir, pagesDirName), (err) => {
        if (err) next(err);
        else console.log(`${pagesDirName} created in ${__basedir}`);
      });
    } else {
      const pagesCreated = [];
      pages.forEach((pagePath) => {
        const infoPath = path.join(
          __basedir,
          pagesDirName,
          pagePath,
          'info.json'
        );
        const exists = fs.existsSync(infoPath);
        if (exists) {
          const file = fs.readFileSync(infoPath);
          if (file.length > 0) {
            const { creator, date } = JSON.parse(file);
            if (creator === userId) {
              pagesCreated.push({ pagePath, info: { creator, date } });
            }
          }
        }
      });
      const r = pagesCreated
        .slice()
        .sort((a, b) => a.info.date - b.info.date)
        .map((item) => item.pagePath);
      res.send(r);
    }
  });
};
