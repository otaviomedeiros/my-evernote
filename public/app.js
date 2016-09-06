var notesApp = angular.module('notesApp', ['ngRoute', 'ngMessages', 'textAngular', 'ngTagsInput', 'ngFlash', 'underscore', 'ui.gravatar']);



notesApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({ redirectTo: '/users/login' });
}]);


notesApp.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}]);


notesApp.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication){
  $rootScope.$on('$routeChangeStart', function(){
    if ($location.path() !== '/users/login' && $location.path() !== '/users/register' && !authentication.isLoggedIn()){
      $location.path('/users/login');
    }
  });
}]);


notesApp.controller('navigationController', ['$scope', 'authentication', function($scope, authentication){

  $scope.isLoggedIn = function(){
    return authentication.isLoggedIn();
  };

  $scope.user = function(){
    return authentication.currentUser();
  };

}]);
