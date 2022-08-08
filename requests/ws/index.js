const { saveText, getText, getTextOther, waitOther } = require('./methods');

function initRequestsWs(ws) {
  return { ws, ...requestsWs };
}

const requestsWs = {
  sendFormatted(type, payload) {
    this.ws.send(JSON.stringify({ type, payload }));
  },
  'save-text': saveText,
  'get-text': getText,
  'other-text': getTextOther,
  waitOther,
};

module.exports = initRequestsWs;
