import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, creatorTextFileName, guestTextFileName, pagesDirName } from '../../../constants';

export const getText: RequestHandler = (req, res): void => {
  const pageName = req.body as string;
  const files = [creatorTextFileName, guestTextFileName];
  const [creatorData, guestData] = files.map((file) =>
    fs.readFileSync(path.resolve(basedir, '../', pagesDirName, pageName, file), {
      encoding: 'utf-8',
    })
  );
  res.send({ creatorData, guestData });
};
