const fs = require('fs');
const path = require('path');
const {
  pagesDirName,
  creatorTextFileName,
  guestTextFileName,
} = require('./constants');

module.exports = {
  list: function listAllPages(req, res, next) {
    fs.readdir(path.join(__dirname, pagesDirName), (err, pages) => {
      if (err) next(err);
      else res.send(pages);
    });
  },
  // Clear pages directory
  // 'remove-all': function removeAllPages(req, res, next) {
  //   fs.readdir(pageDir, (err, files) => {
  //     err
  //       ? console.log(err)
  //       : files.forEach((file) =>
  //           fs.rm(
  //             path.join(__dirname, pageDir, file),
  //             { recursive: true },
  //             (err) => err && console.log(err)
  //           )
  //         );
  //     res.redirect('/');
  //   });
  // },
  'list-created': function listCreated(req, res, next) {
    const userId = req.body;
    fs.readdir(path.join(__dirname, pagesDirName), (err, pages) => {
      if (err) {
        next(err);
        res
          .status(500)
          .send({ err: "Couldn't read directory, attempting to create one" });
        fs.mkdir(path.join(__dirname, pagesDirName), (err) => {
          if (err) {
            next(err);
          } else {
            console.log(`${pagesDirName} created in ${__dirname}`);
          }
        });
      } else {
        const pagesCreated = [];
        pages.forEach((pagePath) => {
          const infoPath = path.join(
            __dirname,
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
  },
  'new-page': function newPage(req, res, next) {
    const { pageName, info } = req.body;
    const newPageDirPath = path.join(__dirname, pagesDirName, pageName);
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
  },
  'save-text': function saveText(req, res, next) {
    const { pageName, isCreator, text } = req.body;
    const filePath = path.join(
      __dirname,
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
  },
  'remove-page': function removePage(req, res, next) {
    const pagePath = req.body;
    const pageDirPath = path.join(__dirname, pagesDirName, pagePath);
    fs.rm(pageDirPath, { recursive: true }, (err) => {
      if (err) {
        next(err);
      } else {
        res.send('Page removed');
      }
    });
  },
  'get-info': function getInfo(req, res, next) {
    const pagePath = req.body;
    fs.readFile(
      path.join(__dirname, pagesDirName, pagePath, 'info.json'),
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
  },
  'update-info': function updateInfo(req, res, next) {
    const { pageName, info } = req.body;
    fs.writeFile(
      path.join(__dirname, pagesDirName, pageName, 'info.json'),
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
  },
  'get-text': function getText(req, res, next) {
    const pageName = req.body;
    const files = [creatorTextFileName, guestTextFileName];
    const [creatorData, guestData] = files.map((file) =>
      fs.readFileSync(path.join(__dirname, pagesDirName, pageName, file), {
        encoding: 'utf-8',
      })
    );
    res.send({ creatorData, guestData });
  },
  'get-text-other': function getTextOther(req, res, next) {
    const { pageName, isCreator } = req.body;
    fs.readFile(
      path.join(
        __dirname,
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
  },
};
