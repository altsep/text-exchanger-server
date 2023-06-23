import fs from 'fs';
import path from 'path';
import { RequestHandler } from 'express';
import { basedir, pagesDirName } from '../../../constants';

export const listAllPages: RequestHandler = (_, res, next): void => {
  fs.readdir(path.join(basedir, pagesDirName), (err, pages) => {
    if (err) next(err);
    else res.send(pages);
  });
};
