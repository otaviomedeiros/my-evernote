import angular from 'angular';
import NotebooksController from './controllers/NotebooksController';
import EditNotebookController from './controllers/EditNotebookController';
import notebookService from './services/NotebookService';

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
      controller: 'NotebooksController',
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
  .controller('EditNotebookController', EditNotebookController)
  .service('notebookService', notebookService);

export default moduleName;
