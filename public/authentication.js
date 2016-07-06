var authApp = angular.module('authApp', ['ngRoute']);

authApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/register', {
      templateUrl: 'register.html',
      controller: 'registerController'
    }).otherwise({ redirectTo: '/register' });
}]);


authApp.controller('registerController', ['$scope', '$http', '$window', function($scope, $http, $window){

  $scope.user = { name: '', email: '', password: '' };

  $scope.register = function(){
    $http.post('/api/authentication/register', $scope.user).success(function(result){
      $window.location.href = '/';
    });
  };

}]);
