import notebooks from './pages/notebooks/notebooks.main';
import notes from './pages/notes/notes.main';
import tags from './pages/tags/tags.main';
import users from './pages/users/users.main';

const moduleName = 'notesApp';

function config($routeProvider){
  $routeProvider.otherwise({ redirectTo: '/users/login' });
}

config.$inject = ['$routeProvider'];

function run($rootScope, $location, authentication){
  $rootScope.$on('$routeChangeStart', function(){
    if ($location.path() !== '/users/login' && $location.path() !== '/users/register' && !authentication.isLoggedIn()){
      $location.path('/users/login');
    }
  });
}

run.$inject = ['$rootScope', '$location', 'authentication'];

const dependencies = ['ngRoute', 'ngMessages', 'textAngular', 'ngTagsInput',
  'ngFlash', 'underscore', 'ui.gravatar', notebooks, notes, tags, users];

angular.module(moduleName, dependecies)
  .config(config)
  run(run);


exports default moduleName;
