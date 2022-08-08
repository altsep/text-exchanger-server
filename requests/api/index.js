const {
  listAllPages,
  removeAllPages,
  listCreated,
  newPage,
  removePage,
  getInfo,
  getText,
  getTextOther,
  saveText,
  updateInfo,
} = require('./methods');

module.exports = {
  list: listAllPages,
  // 'remove-all': removeAllPages,
  'list-created': listCreated,
  'new-page': newPage,
  'save-text': saveText,
  'remove-page': removePage,
  'get-info': getInfo,
  'update-info': updateInfo,
  'get-text': getText,
  'other-text': getTextOther,
};
