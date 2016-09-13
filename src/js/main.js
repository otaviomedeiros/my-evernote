import notebooks from './notebooks/notebooks.main';
import notes from './notes/notes.main';
import tags from './tags/tags.main';
import users from './users/users.main';

import services from './common/services/services.main';
import controllers from './common/controllers/controllers.main';
import directives from './common/directives/directives.main';
import filters from './common/filters/filters.main';

import '../css/style.css';


function config($routeProvider){
  $routeProvider.otherwise({ redirectTo: '/users/login' });
}

config.$inject = ['$routeProvider'];

function run($rootScope, $location, AuthService){
  $rootScope.$on('$routeChangeStart', function(){
    if ($location.path() !== '/users/login' && $location.path() !== '/users/register' && !AuthService.isLoggedIn()){
      $location.path('/users/login');
    }
  });
}

run.$inject = ['$rootScope', '$location', 'AuthService'];

const moduleName = 'notesApp';

angular.module(moduleName, ['ngRoute', 'ngMessages', 'textAngular', 'ngTagsInput', 'ngFlash', 'ui.gravatar',
  services, controllers, directives, filters, notebooks, notes, tags, users])
  .config(config)
  .run(run);


export default moduleName;
