import angular from 'angular';
import NotebooksController from './controllers/NotebooksController';
import notebookService from './services/NotebookService';
import UniqueNotebook from './directives/UniqueNotebook';

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
      controllerAs: 'notebooks'
    }).
    when('/notebooks/:id', {
      templateUrl: 'pages/notebooks/edit.html',
      controller: 'NotebooksController',
      controllerAs: 'notebooks'
    });
};

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .config(config)
  .directive('uniqueNotebook', UniqueNotebook)
  .controller('NotebooksController', NotebooksController)
  .service('notebookService', notebookService);

export default moduleName;
