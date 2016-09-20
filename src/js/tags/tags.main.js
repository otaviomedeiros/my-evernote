import angular from 'angular';
import TagsController from './controllers/TagsController';
import tagService from "./services/TagService";
import UniqueTag from './directives/UniqueTag';

function config($routeProvider){
  $routeProvider.
    when('/tags', {
      templateUrl: 'pages/tags/index.html',
      controller: 'TagsController',
      controllerAs: 'tags'
    }).
    when('/tags/new', {
      templateUrl: 'pages/tags/form.html',
      controller: 'TagsController',
      controllerAs: 'tags'
    });
};

config.$inject = ['$routeProvider'];

const moduleName = 'tags';

angular.module(moduleName, [])
  .config(config)
  .directive('uniqueTag', UniqueTag)
  .controller('TagsController', TagsController)
  .service('tagService', tagService);

export default moduleName;
