import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, pagesDirName } from '../../../constants';

export const removePage: RequestHandler = (req, res, next) => {
  const pagePath = req.body as string;
  const pageDirPath = path.resolve(basedir, '../', pagesDirName, pagePath);
  fs.rm(pageDirPath, { recursive: true }, (err) => {
    if (err) {
      next(err);
    } else {
      res.send('Page removed');
    }
  });
};
