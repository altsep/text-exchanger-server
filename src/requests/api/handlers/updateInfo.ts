import fs from 'fs';
import path from 'path';
import { RequestHandler } from 'express';
import { Page } from '../../../types';
import { basedir, pagesDirName } from '../../../constants';

export const updateInfo: RequestHandler = (req, res, next): void => {
  const { pageName, info } = req.body as Page;
  fs.writeFile(path.join(basedir, pagesDirName, pageName, 'info.json'), JSON.stringify(info), (err) => {
    if (err) {
      next(err);
      res.status(500).send("Couldn't write file");
    } else {
      res.send('Info updated');
    }
  });
};
