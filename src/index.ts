import compression from 'compression';
import express from 'express';
import expressWs from 'express-ws';
import morgan from 'morgan';
import path from 'path';
import portfinder from 'portfinder';
import { msInAMinute } from './constants';
import { requests } from './requests/api';
import { initRequestsWs } from './requests/ws';
import { Text } from './types';
import { clearOutdatedEntries } from './util';

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

app.use(morgan('dev'));
app.use(compression());
app.use(express.json({ limit: '128kb' }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.set('json spaces', 2);

app.use('/', express.static('dist'));

app.ws('/', (ws, _req, next) => {
  const requestsWs = initRequestsWs(ws);
  ws.on('message', (message: string) => {
    const { type, payload } = JSON.parse(message) as { type: keyof typeof requestsWs; payload: Text };

    if (requestsWs[type] != null && type !== 'sendFormatted') {
      const handler = requestsWs[type];
      handler(payload);
    }

    // Check ws connection
    // requestsWs.sendFormatted('system', 'Connected to WebSocket server');
    // console.log('received: %s', message);
    // requestsWs.sendFormatted('system', `You sent the following: "${message}"`);
  });

  ws.on('error', (err) => {
    requestsWs.sendFormatted('error', { message: err });
    next(err);
  });
});

app.route(/^\/\w{6}$/).get((_req, res) => res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html')));

app.get('/api/:param', (req, res, next) => {
  const param = req.params.param as keyof typeof requests;
  if (requests[param] != null) {
    requests[param](req, res, next);
  } else res.status(404).send({ err: 'Wrong API call' });
});

app.post('/api/:param', (req, res, next) => {
  const param = req.params.param as keyof typeof requests;
  if (requests[param] != null) {
    const handler = requests[param];
    handler(req, res, next);
  } else res.status(404).send({ err: 'Wrong API call' });
});

setInterval(() => {
  clearOutdatedEntries().catch(console.error);
}, msInAMinute);
