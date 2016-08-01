angular.module('notesApp').filter('htmlToPlaintext', function() {
  return function(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
});

angular.module('notesApp').filter('notecontent', function() {
  return function(noteContent) {
    return noteContent ? noteContent.substr(0, 580) : '';
  }
});
