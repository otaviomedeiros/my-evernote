import angular from 'angular';
import EmailAlreadyInUse from './directives/EmailAlreadyInUse';
import AuthController from './controllers/AuthController';
import RegisterController from './controllers/RegisterController';
import UserController from './controllers/UserController';
import authService from './services/AuthService';
import UserService from "./services/UserService";

function config($routeProvider){
  $routeProvider.
    when('/users/login', {
      templateUrl: 'pages/users/login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    }).
    when('/users/register', {
      templateUrl: 'pages/users/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    }).
    when('/user/settings', {
      templateUrl: 'pages/users/settings.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    });
}

config.$inject = ['$routeProvider'];


const moduleName = 'users';

angular.module(moduleName, [])
  .directive('emailAlreadyInUse', EmailAlreadyInUse)
  .controller('AuthController', AuthController)
  .controller('RegisterController', RegisterController)
  .controller('UserController', UserController)
  .service('authService', authService)
  .service("userService", UserService)
  .config(config);

export default moduleName;
