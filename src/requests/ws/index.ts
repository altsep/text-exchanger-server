import fs from 'fs';
import path from 'path';
import * as WebSocket from 'ws';
import { Text } from '../../types';
import { basedir, pagesDirName, creatorTextFileName, guestTextFileName } from '../../constants';

class RequestsWs {
  constructor(private ws: WebSocket) {}

  public sendFormatted(type: string, payload: unknown): void {
    this.ws.send(JSON.stringify({ type, payload }));
  }

  public 'save-text' = (data: Text): void => {
    const { text } = data;
    const filePath = RequestsWs.getOwnFilePath(data);
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        this.sendFormatted('error', { message: "Couldn't write file" });
      } else {
        this.sendFormatted('system', 'Text saved');
      }
    });
  };

  public 'get-text' = (data: Text): void => {
    const { pageName } = data;
    const files = [creatorTextFileName, guestTextFileName];
    const [creatorData, guestData] = files.map((file) =>
      fs.readFileSync(path.join(basedir, pagesDirName, pageName, file), {
        encoding: 'utf-8',
      })
    );
    this.sendFormatted('get-text', { creatorData, guestData });
    this.waitOther(data);
  };

  public 'other-text' = (data: Text): void => {
    const filePath = RequestsWs.getOtherFilePath(data);
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileData) => {
      if (err) {
        this.sendFormatted('error', {
          status: 500,
          message: "Couldn't find data",
        });
      } else {
        this.sendFormatted('other-text', { text: fileData });
        this.sendFormatted('system', 'Text received');
      }
    });
  };

  public waitOther = (data: Text): void => {
    const filePath = RequestsWs.getOtherFilePath(data);
    fs.watchFile(filePath, { interval: 500 }, (curr, prev) => {
      if (curr.mtimeMs > prev.mtimeMs) {
        this['other-text'](data);
      }
    });
  };

  private static getOtherFilePath = ({ pageName, isCreator }: Text): string => {
    return path.join(basedir, pagesDirName, pageName, isCreator ? guestTextFileName : creatorTextFileName);
  };

  private static getOwnFilePath = ({ pageName, isCreator }: Text): string => {
    return path.join(basedir, pagesDirName, pageName, isCreator ? creatorTextFileName : guestTextFileName);
  };
}

const initRequestsWs = (ws: WebSocket): RequestsWs => {
  const requestsWs = new RequestsWs(ws);
  return requestsWs;
};

export { initRequestsWs };
