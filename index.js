const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json({ limit: '128kb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use('/', express.static('dist'));

app
  .route(/^\/\w{6}$/)
  .get((req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

const pagesDirName = 'pages';
const creatorTextFileName = 'creator';
const guestTextFileName = 'guest';

app.get('/api/:p', (req, res, next) => {
  const { p } = req.params;
  switch (p) {
    case 'list':
      fs.readdir(path.join(__dirname, pagesDirName), (err, pages) => {
        if (err) {
          next(err);
        } else {
          res.send(pages);
        }
      });
      break;
    // Used for debugging purposes
    // case 'remove-all':
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
    //   break;
    default:
      res.status(404).send('Wrong API call');
  }
});

app.post('/api/:p', (req, res, next) => {
  const { p } = req.params;
  switch (p) {
    case 'list-created':
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
      break;
    case 'new-page':
      {
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
      }
      break;
    case 'save-text':
      {
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
      }
      break;
    case 'remove-page':
      {
        const pagePath = req.body;
        const pageDirPath = path.join(__dirname, pagesDirName, pagePath);
        fs.rm(pageDirPath, { recursive: true }, (err) => {
          if (err) {
            next(err);
          } else {
            res.send('Page removed');
          }
        });
      }
      break;
    case 'get-info':
      {
        const pagePath = req.body;
        fs.readFile(
          path.join(__dirname, pagesDirName, pagePath, 'info.json'),
          { encoding: 'utf-8' },
          (err, file) => {
            if (err) {
              next(err);
              res
                .status(500)
                .send({ err: "Couldn't find data for current path" });
            } else {
              res.send(file);
            }
          }
        );
      }
      break;
    case 'update-info': {
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
      break;
    }
    case 'get-text':
      {
        const pageName = req.body;
        const files = [creatorTextFileName, guestTextFileName];
        const [creatorData, guestData] = files.map((file) =>
          fs.readFileSync(path.join(__dirname, pagesDirName, pageName, file), {
            encoding: 'utf-8',
          })
        );
        res.send({ creatorData, guestData });
      }
      break;
    case 'get-text-other':
      {
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
      }
      break;
    default:
      res.status(404).send('Wrong API call');
  }
});

const msInAWeek = 604800000;
// const msInADay = 86400000;
const msInAMinute = 60000;

function clearOutdatedEntries() {
  fs.readdir(path.join(__dirname, pagesDirName), (err, pages) => {
    if (err) {
      console.log(err);
      fs.mkdir(path.join(__dirname, pagesDirName), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${pagesDirName} created in ${__dirname}`);
        }
      });
    } else if (pages.length > 0) {
      const currentDate = Date.now();
      pages.forEach((page) => {
        fs.readFile(
          path.join(__dirname, pagesDirName, page, 'info.json'),
          'utf-8',
          (err, data) => {
            if (err) {
              next(err);
            } else {
              const { date } = JSON.parse(data);
              if (!date || currentDate - date > msInAWeek) {
                fs.rm(
                  path.join(__dirname, pagesDirName, page),
                  { recursive: true },
                  (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(
                        'Removed page',
                        page,
                        date ? '(outdated)' : '(no data)'
                      );
                    }
                  }
                );
              }
            }
          }
        );
      });
    }
  });
}

setInterval(clearOutdatedEntries, msInAMinute);
