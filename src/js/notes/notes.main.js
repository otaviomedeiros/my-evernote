import NewNoteController from './controllers/NewNoteController';
import EditNoteController from './controllers/EditNoteController';
import NotesByNotebookController from './controllers/NotesByNotebookController';
import NotesByTagController from './controllers/NotesByTagController';

const moduleName = 'notes';

function config($routeProvider){
  $routeProvider.
    when('/notes/new', {
      templateUrl: 'pages/notes/form.html',
      controller: 'NewNoteController',
      controllerAs: 'noteCtrl'
    }).
    when('/notebooks/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'NotesByNotebookController',
      controllerAs: 'notes'
    }).
    when('/notes/:id', {
      templateUrl: 'pages/notes/form.html',
      controller: 'EditNoteController',
      controllerAs: 'noteCtrl'
    }).
    when('/tags/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'NotesByTagController',
      controllerAs: 'notes'
    });
}

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .controller('NewNoteController', NewNoteController)
  .controller('EditNoteController', EditNoteController)
  .controller('NotesByTagController', NotesByTagController)
  .controller('NotesByNotebookController', NotesByNotebookController)
  .config(config);

export default moduleName;
