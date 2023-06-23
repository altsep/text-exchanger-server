import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { basedir, pagesDirName } from '../../../constants';
import { Info, Page } from '../../../types';

export const listCreated: RequestHandler = (req, res, next): void => {
  const userId = req.body as string;
  fs.readdir(path.resolve(basedir, '../', pagesDirName), (err, pages) => {
    if (err) {
      next(err);
      res.status(500).send({
        err: "Couldn't read the pages directory, attempting to create one",
      });
      fs.mkdir(path.resolve(basedir, '../', pagesDirName), (error) => {
        if (error) next(error);
        else console.log(`${pagesDirName} created in ${basedir}`);
      });
    } else {
      const pagesCreated: Page[] = [];
      pages.forEach((pageName) => {
        const infoPath = path.resolve(basedir, '../', pagesDirName, pageName, 'info.json');
        const exists = fs.existsSync(infoPath);
        if (exists) {
          const file = fs.readFileSync(infoPath, 'utf-8');
          if (file.length > 0) {
            const { creator, date } = JSON.parse(file) as Info;
            if (creator === userId) {
              pagesCreated.push({ pageName, info: { creator, date } });
            }
          }
        }
      });
      const r = pagesCreated
        .slice()
        .sort((a, b) => a.info.date - b.info.date)
        .map((item) => item.pageName);
      res.send(r);
    }
  });
};
