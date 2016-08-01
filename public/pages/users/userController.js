angular.module('notesApp').controller('userSettingsController', ['$scope', '$location', '$http', 'authentication', 'Flash', function($scope, $location, $http, authentication, Flash){

  $scope.cancel = function(){
    $location.path('/');
  };

  $scope.save = function(){
    $http.put('/api/users/' + $scope.user._id, $scope.user)
      .success(function(result){
        $location.path('/');
        Flash.create('Success', 'Profile updated with success!', 3000, {}, false);
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  }

  $http.get('/api/users/' + authentication.currentUser().id)
    .success(function(result){
      $scope.user = result;
    })
    .error(function(error){
      Flash.create('danger', error, 0, {}, false);
    });

}]);

angular.module('notesApp').config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/user/settings', {
      templateUrl: 'pages/users/settings.html',
      controller: 'userSettingsController'
    });
}]);
