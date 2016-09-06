import TagsController from './TagsController';
import NewTagController from './NewTagController';

function config($routeProvider){
  $routeProvider.
    when('/tags', {
      templateUrl: 'pages/tags/index.html',
      controller: 'TagsController'
    }).
    when('/tags/new', {
      templateUrl: 'pages/tags/form.html',
      controller: 'NewTagController'
    });
};

config.$inject = ['$routeProvider'];

const moduleName = 'tags';

angular.module(moduleName, [])
  .controller('TagsController', TagsController)
  .controller('NewTagController', NewTagController)

exports default moduleName;
