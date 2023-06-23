import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, creatorTextFileName, guestTextFileName, pagesDirName } from '../../../constants';
import { Text } from '../../../types';

export const saveText: RequestHandler = (req, res, next): void => {
  const { pageName, isCreator, text } = req.body as Text;
  const filePath = path.resolve(
    basedir,
    '../',
    pagesDirName,
    pageName,
    isCreator ? creatorTextFileName : guestTextFileName
  );
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      next(err);
      res.send({ err: "Couldn't write file" });
    } else {
      res.send({ message: 'Text saved' });
    }
  });
};
