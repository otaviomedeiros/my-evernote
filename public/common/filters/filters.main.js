const htmlToPlaintext = (text) => text ? String(text).replace(/<[^>]+>/gm, '') : '';
const noteContent = (content) => noteContent ? noteContent.substr(0, 580) : '';

const moduleName = 'filters';
angular.module(moduleName, [])
  .filter('htmlToPlaintext', htmlToPlaintext)
  .filter('notecontent', noteContent);

exports default moduleName;
