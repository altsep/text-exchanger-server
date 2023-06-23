import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, pagesDirName } from '../../../constants';

export const listAllPages: RequestHandler = (_, res, next): void => {
  fs.readdir(path.resolve(basedir, '../', pagesDirName), (err, pages) => {
    if (err) next(err);
    else res.send(pages);
  });
};
