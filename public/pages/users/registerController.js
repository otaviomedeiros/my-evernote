angular.module('notesApp').controller('registerController', ['$scope', '$location', 'authentication', function($scope, $location, authentication){

  $scope.user = { name: '', email: '', password: '' };

  $scope.serverErrors = [];

  $scope.register = function(){
    authentication
      .register($scope.user)
      .error(function(err){
        console.log(err);
      })
      .then(function(){
        $location.path('/notebooks');
      });
  };

}]);

angular.module('notesApp').config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/users/register', {
      templateUrl: 'pages/users/register.html',
      controller: 'registerController'
    });
}]);
