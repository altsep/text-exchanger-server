import {
  getInfo,
  getText,
  getTextOther,
  listAllPages,
  listCreated,
  newPage,
  removePage,
  saveText,
  updateInfo,
} from './handlers';

const requests = {
  list: listAllPages,
  'list-created': listCreated,
  'new-page': newPage,
  'save-text': saveText,
  'remove-page': removePage,
  'get-info': getInfo,
  'update-info': updateInfo,
  'get-text': getText,
  'other-text': getTextOther,
};

export { requests };
