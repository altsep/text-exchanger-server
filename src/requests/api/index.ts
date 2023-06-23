import {
  listAllPages,
  listCreated,
  newPage,
  removePage,
  getInfo,
  getText,
  getTextOther,
  saveText,
  updateInfo,
} from './handlers';

class Requests {
  public list = listAllPages;

  public 'list-created' = listCreated;

  public 'new-page' = newPage;

  public 'save-text' = saveText;

  public 'remove-page' = removePage;

  public 'get-info' = getInfo;

  public 'update-info' = updateInfo;

  public 'get-text' = getText;

  public 'other-text' = getTextOther;
}

const requests = new Requests();

export { requests };
