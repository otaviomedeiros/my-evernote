import NewNoteController from './NewNoteController';
import EditNoteController from './EditNoteController';
import NotesByNotebookController from './NotesByNotebookController';
import NotesByTagController from './NotesByTagController';

const moduleName = 'notes';

function config($routeProvider){
  $routeProvider.
    when('/notes/new', {
      templateUrl: 'pages/notes/form.html',
      controller: 'NewNoteController'
    }).
    when('/notebooks/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'NotesByNotebookController'
    }).
    when('/notes/:id', {
      templateUrl: 'pages/notes/form.html',
      controller: 'EditNoteController'
    }).
    when('/tags/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'NotesByTagController'
    });
}

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .controller('NewNoteController', NewNoteController)
  .controller('EditNoteController', EditNoteController)
  .controller('NotesByTagController', NotesByTagController)
  .controller('NotesByNotebookController', NotesByNotebookController)
  .config(config);

exports default moduleName;
