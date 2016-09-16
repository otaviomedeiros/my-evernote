import angular from 'angular';
import NotebooksController from './controllers/NotebooksController';
import NewNotebookController from './controllers/NewNotebookController';
import EditNotebookController from './controllers/EditNotebookController';

const moduleName = 'notebooks';

function config($routeProvider){
  $routeProvider.
    when('/notebooks', {
      templateUrl: 'pages/notebooks/index.html',
      controller: 'NotebooksController',
      controllerAs: 'notebooks'
    }).
    when('/notebooks/new', {
      templateUrl: 'pages/notebooks/new.html',
      controller: 'NewNotebookController',
      controllerAs: 'newNotebook'
    }).
    when('/notebooks/:id', {
      templateUrl: 'pages/notebooks/edit.html',
      controller: 'EditNotebookController',
      controllerAs: 'editNotebook'
    });
};

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .config(config)
  .controller('NotebooksController', NotebooksController)
  .controller('NewNotebookController', NewNotebookController)
  .controller('EditNotebookController', EditNotebookController);

export default moduleName;