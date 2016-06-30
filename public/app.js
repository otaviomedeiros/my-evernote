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
    });
}]);


notesApp.controller('notebooksController', ['$scope', function($scope){

}]);

notesApp.controller('notebookFormController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.notebook = {};

  $scope.saveNotebook = function(){
    $http.post('/api/notes', $scope.notebook).then(function(result){
      $scope.notebook = {};
      $location.path('/notebooks');
    });
  }

}]);
