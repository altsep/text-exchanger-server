import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, creatorTextFileName, guestTextFileName, pagesDirName } from '../../../constants';
import { Text } from '../../../types';

export const getTextOther: RequestHandler = (req, res, next): void => {
  const { pageName, isCreator } = req.body as Text;
  fs.readFile(
    path.resolve(basedir, '../', pagesDirName, pageName, isCreator ? guestTextFileName : creatorTextFileName),
    { encoding: 'utf-8' },
    (err, file) => {
      if (err) {
        next(err);
        res.status(500).send({ err: "Couldn't find data" });
      } else {
        res.send({ text: file });
      }
    }
  );
};
