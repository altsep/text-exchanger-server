import fs from 'fs';
import path from 'path';
import { RequestHandler } from 'express';
import { basedir, pagesDirName, creatorTextFileName, guestTextFileName } from '../../../constants';

export const getText: RequestHandler = (req, res): void => {
  const pageName = req.body as string;
  const files = [creatorTextFileName, guestTextFileName];
  const [creatorData, guestData] = files.map((file) =>
    fs.readFileSync(path.join(basedir, pagesDirName, pageName, file), {
      encoding: 'utf-8',
    })
  );
  res.send({ creatorData, guestData });
};
