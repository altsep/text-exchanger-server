import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, pagesDirName } from '../../../constants';

export const getInfo: RequestHandler = (req, res, next): void => {
  const pagePath = req.body as string;
  fs.readFile(path.resolve(basedir, '../', pagesDirName, pagePath, 'info.json'), { encoding: 'utf-8' }, (err, file) => {
    if (err) {
      next(err);
      res.status(500).send({ err: "Couldn't find data for the current path" });
    } else {
      res.send(file);
    }
  });
};
