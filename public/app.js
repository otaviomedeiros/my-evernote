var notesApp = angular.module('notesApp', ['ngRoute']);

notesApp.config(['$routeProvider', function($routeProvider){

  $routeProvider.
    when('/notebooks', {
      templateUrl: 'pages/notebooks/index.html',
      controller: 'notebooksController'
    }).
    when('/notebooks/new', {
      templateUrl: 'pages/notebooks/new.html',
      controller: 'notebookFormController'
    }).
    when('/notebooks/:id', {
      templateUrl: 'pages/notebooks/edit.html',
      controller: 'notebookFormController'
    });
}]);


notesApp.controller('notebooksController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.notebooks = [];

  $scope.deleteNotebook = function(notebook){
    $http.delete('/api/notebooks/' + notebook._id).then(function(result){
      $http.get('/api/notebooks').then(function(result){
        $scope.notebooks = result.data;
      });
    });
  };

  $http.get('/api/notebooks').then(function(result){
    $scope.notebooks = result.data;
  });

}]);

notesApp.controller('notebookFormController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){

  if ($routeParams.id){
    $http.get('/api/notebooks/' + $routeParams.id).then(function(result){
        $scope.notebook = result.data;
    });
  } else {
    $scope.notebook = {};
  }

  $scope.saveNotebook = function(){
    $http.post('/api/notebooks', $scope.notebook).then(function(result){
      $scope.notebook = {};
      $location.path('/notebooks');
    });
  };

  $scope.updateNotebook = function(){
    $http.put('/api/notebooks/' + $scope.notebook._id, $scope.notebook).then(function(result){
      $scope.notebook = {};
      $location.path('/notebooks');
    });
  };

  $scope.cancelNotebook = function(){
    $scope.notebook = {};
    $location.path('/notebooks');
  };

}]);
