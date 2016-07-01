var notesApp = angular.module('notesApp', ['ngRoute', 'textAngular']);

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
    }).
    when('/notebooks/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'notesController'
    }).
    when('/notes/new', {
      templateUrl: 'pages/notes/new.html',
      controller: 'noteFormController'
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

notesApp.controller('noteFormController', ['$scope', '$http', function($scope, $http){

  $scope.note = {};
  $scope.notebooks = [];

  $scope.saveNote = function(){
    $http.post('/api/notes', $scope.note).then(function(result){
      console.log(result.data);
    });
  };

  $http.get('/api/notebooks').then(function(result){
    $scope.notebooks = result.data;
  });
}]);


notesApp.controller('notesController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

  $scope.notes = [];

  $http.get('/api/notebooks/' + $routeParams.id + '/notes').then(function(result){
    $scope.notes = result.data;
  });
}]);

notesApp.filter('htmlToPlaintext', function() {
  return function(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
});

notesApp.filter('notecontent', function() {
  return function(noteContent) {
    return noteContent ? noteContent.substr(0, 300) : '';
  }
});
