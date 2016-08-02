angular.module('notesApp').controller('authController', ['$scope', '$location', 'authentication', 'Flash', function($scope, $location, authentication, Flash){

  if (authentication.isLoggedIn()){
    $location.path('/notebooks');
  }

  $scope.user = { email: '', password: '' };

  $scope.login = function(){
    Flash.clear();

    authentication
      .login($scope.user)
      .error(function(err){
        Flash.create('danger', err.message, 0, {}, false);
      })
      .success(function(){
        $location.path('/notebooks');
      });
  };

  $scope.logout = function(){
    authentication.logout();
    $location.path('/users/login');
  };

}]);


angular.module('notesApp').config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/users/login', {
      templateUrl: 'pages/users/login.html',
      controller: 'authController'
    });
}]);
