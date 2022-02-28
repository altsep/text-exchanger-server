const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json({ limit: '128kb' }));
app.use(express.text());

app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use('/', express.static(path.resolve(__dirname, 'dist')));

app
  .route(/\w{6}/)
  .get((req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  );

const filesDir = 'files';
const file = 'pages.json';

let filesList;

app.get('/api', (req, res) => {
  let data;
  readdirSync();
  filesList.length > 0
    ? (data = fs.readFileSync(path.join(__dirname, filesDir, file), 'utf8'))
    : (data = '');
  res.json({ message: 'Hello from server!', data });
});

app.post('/api', (req, res) => {
  const data = JSON.stringify(req.body);
  fs.writeFileSync(path.join(__dirname, filesDir, file), data);
  const resData = JSON.parse(
    fs.readFileSync(path.join(__dirname, filesDir, file), 'utf8')
  );
  res.json({
    message: 'Wrote data!',
  });
});

function readdirSync() {
  filesList = fs.readdirSync(filesDir);
}

const msInADay = 86400000;
const msinAMinute = 60000;

function clearOutdatedEntries() {
  readdirSync();
  if (filesList.length > 0) {
    const data = fs.readFileSync(path.join(__dirname, filesDir, file), 'utf8');
    if (data) {
      const parsedData = JSON.parse(data);
      const currentDate = Date.now();
      const newData = parsedData.filter((a) => currentDate - a.date < msInADay);
      const oldData = parsedData.filter((a) => currentDate - a.date > msInADay);
      if (oldData.length > 0) {
        fs.writeFile(
          path.join(__dirname, filesDir, file),
          JSON.stringify(newData),
          (err) => {
            if (err) console.log(err);
          }
        );
        console.log(
          'Cleared entries: ',
          oldData.lenggth,
          'Current entries: ',
          parsedData.length
        );
      }
    }
  }
}

setInterval(clearOutdatedEntries, msinAMinute);
