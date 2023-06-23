import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { Text } from '../../../types';
import { basedir, pagesDirName, creatorTextFileName, guestTextFileName } from '../../../constants';

export const getTextOther: RequestHandler = (req, res, next): void => {
  const { pageName, isCreator } = req.body as Text;
  fs.readFile(
    path.join(basedir, pagesDirName, pageName, isCreator ? guestTextFileName : creatorTextFileName),
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
