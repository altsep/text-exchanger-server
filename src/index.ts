import compression = require('compression');
import express = require('express');
import path = require('path');
import portfinder = require('portfinder');
import expressWs = require('express-ws');
import initRequestsWs = require('./requests/ws');
import requests = require('./requests/api');
import clearOutdatedEntries = require('./func/clearOutdatedEntries');
import constants = require('./constants');

const { app } = expressWs(express());

portfinder.getPort(
  {
    port: 3001,
    stopPort: 9000,
  },
  (err, port) => {
    if (err) throw err;
    const PORT = process.env.PORT || port;
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  }
);

app.use(compression());
app.use(express.json({ limit: '128kb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.set('json spaces', 2);

app.use('/', express.static('dist'));

app.ws('/', (ws, req) => {
  const requestsWs = initRequestsWs(ws);
  ws.on('message', (message) => {
    const { type, payload } = JSON.parse(message);
    if (requestsWs.hasOwnProperty(type)) {
      requestsWs[type](payload);
    }
    // Check ws connection
    // requestsWs.sendFormatted('system', 'Connected to WebSocket server');
    // console.log('received: %s', message);
    // requestsWs.sendFormatted('system', `You sent the following: "${message}"`);
  });

  ws.on('error', (err) => {
    sendFormatted('error', { message: err });
    next(err);
  });
});

// app
//   .route(/^\/\w{6}$/)
//   .get((req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

// app.get('/api/:param', (req, res, next) => {
//   const { param } = req.params;
//   if (requests.hasOwnProperty(param)) {
//     requests[param](req, res, next);
//   } else res.status(404).send({ err: 'Wrong API call' });
// });

// app.post('/api/:param', (req, res, next) => {
//   const { param } = req.params;
//   if (requests.hasOwnProperty(param)) {
//     requests[param](req, res, next);
//   } else res.status(404).send({ err: 'Wrong API call' });
// });

const { msInAMinute } = constants;

setInterval(() => {
  clearOutdatedEntries().catch(console.error);
}, msInAMinute);
