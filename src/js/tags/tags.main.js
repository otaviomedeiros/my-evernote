import TagsController from './controllers/TagsController';
import NewTagController from './controllers/NewTagController';

function config($routeProvider){
  $routeProvider.
    when('/tags', {
      templateUrl: 'pages/tags/index.html',
      controller: 'TagsController',
      controllerAs: 'tags'
    }).
    when('/tags/new', {
      templateUrl: 'pages/tags/form.html',
      controller: 'NewTagController',
      controllerAs: 'newTag'
    });
};

config.$inject = ['$routeProvider'];

const moduleName = 'tags';

angular.module(moduleName, [])
  .config(config)
  .controller('TagsController', TagsController)
  .controller('NewTagController', NewTagController)

export default moduleName;
