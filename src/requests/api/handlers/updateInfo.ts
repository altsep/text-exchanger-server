import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, pagesDirName } from '../../../constants';
import { Page } from '../../../types';

export const updateInfo: RequestHandler = (req, res, next): void => {
  const { pageName, info } = req.body as Page;
  fs.writeFile(path.resolve(basedir, '../', pagesDirName, pageName, 'info.json'), JSON.stringify(info), (err) => {
    if (err) {
      next(err);
      res.status(500).send("Couldn't write file");
    } else {
      res.send('Info updated');
    }
  });
};
