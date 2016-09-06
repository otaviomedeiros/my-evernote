import AuthController from './AuthController';
import RegisterController from './RegisterController';
import UserController from './UserController';
import AuthService from './AuthService';

function config($routeProvider){
  $routeProvider.
    when('/users/login', {
      templateUrl: 'pages/users/login.html',
      controller: 'AuthController'
    }).
    when('/users/register', {
      templateUrl: 'pages/users/register.html',
      controller: 'RegisterController'
    }).
    when('/user/settings', {
      templateUrl: 'pages/users/settings.html',
      controller: 'UserController'
    });
}

config.$inject = ['$routeProvider'];


const moduleName = 'users';

angular.module(moduleName, [])
  .controller('AuthController', AuthController)
  .controller('RegisterController', RegisterController)
  .controller('UserController', UserController)
  .service('AuthService', AuthService)
  .config(config);

exports default moduleName;
