import NotebooksController from './NotebooksController';
import NewNotebookController from './NewNotebookController';
import EditNotebookController from './EditNotebookController';
import NotebookNotesController from './NotebookNotesController';

const moduleName = 'notebooks';

function config($routeProvider){
  $routeProvider.
    when('/notebooks', {
      templateUrl: 'pages/notebooks/index.html',
      controller: 'NotebooksController'
    }).
    when('/notebooks/new', {
      templateUrl: 'pages/notebooks/new.html',
      controller: 'NewNotebookController'
    }).
    when('/notebooks/:id', {
      templateUrl: 'pages/notebooks/edit.html',
      controller: 'EditNotebookController'
    }).
    when('/notebooks/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'NotebookNotesController'
    })
}]);

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .config(config)
  .controller('NotebooksController', NotebooksController)
  .controller('NewNotebookController', NewNotebookController)
  .controller('EditNotebookController', EditNotebookController);
  .controller('NotebookNotesController', NotebookNotesController);

exports default moduleName;
