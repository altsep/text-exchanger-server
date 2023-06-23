import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, creatorTextFileName, guestTextFileName, pagesDirName } from '../../../constants';
import { Page } from '../../../types';

export const newPage: RequestHandler = (req, res, next): void => {
  const { pageName, info } = req.body as Page;
  const newPageDirPath = path.resolve(basedir, '../', pagesDirName, pageName);
  const files = ['info.json', creatorTextFileName, guestTextFileName];
  fs.mkdir(newPageDirPath, { recursive: true }, (err) => {
    if (err) {
      next(err);
      res.status(500).send("Couldn't create directory");
    } else {
      files.forEach((file) =>
        fs.writeFile(path.join(newPageDirPath, file), file === 'info.json' ? JSON.stringify(info) : '', (error) => {
          if (error) {
            next(error);
            res.status(500).send("Couldn't write file");
          }
        })
      );
      res.send(`Page added: ${pageName}`);
    }
  });
};
