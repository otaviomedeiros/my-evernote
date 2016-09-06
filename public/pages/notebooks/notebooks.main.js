import NotebooksController from './NotebooksController';
import NewNotebookController from './NewNotebookController';
import EditNotebookController from './EditNotebookController';

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
    })
}]);

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .config(config)
  .controller('NotebooksController', NotebooksController)
  .controller('NewNotebookController', NewNotebookController)
  .controller('EditNotebookController', EditNotebookController);

exports default moduleName;
