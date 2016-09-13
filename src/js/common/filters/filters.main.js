const htmlToPlaintext = () => {
  return (text) => text ? String(text).replace(/<[^>]+>/gm, '') : '';
};

const noteContent = () => {
  return (content) => content ? content.substr(0, 580) : '';
};

const moduleName = 'filters';
angular.module(moduleName, [])
  .filter('htmlToPlaintext', htmlToPlaintext)
  .filter('notecontent', noteContent);

export default moduleName;
