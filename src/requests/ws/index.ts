import WebSocket = require('ws');
import methods = require('./methods');

const { saveText, getText, getTextOther, waitOther } = methods;

const requestsWs = {
  sendFormatted(type: string, payload: unknown): void {
    if ('ws' in this && this.ws instanceof WebSocket) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  },
  'save-text': saveText,
  'get-text': getText,
  'other-text': getTextOther,
  waitOther,
};

function initRequestsWs(ws: WebSocket): { ws: WebSocket } {
  return { ws, ...requestsWs };
}

export = initRequestsWs;
