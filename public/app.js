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
      templateUrl: 'pages/notes/form.html',
      controller: 'newNoteController'
    }).
    when('/notes/:id', {
      templateUrl: 'pages/notes/form.html',
      controller: 'editNoteController'
    }).
    when('/tags', {
      templateUrl: 'pages/tags/index.html',
      controller: 'tagsController'
    }).
    when('/tags/new', {
      templateUrl: 'pages/tags/form.html',
      controller: 'tagsFormController'
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

notesApp.controller('newNoteController', ['$scope', '$http', function($scope, $http){

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


notesApp.controller('editNoteController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

  $scope.note = {};
  $scope.notebooks = [];

  $scope.saveNote = function(){
    $http.put('/api/notes/' + $scope.note._id, $scope.note).then(function(result){
      console.log(result.data);
    });
  };

  $http.get('/api/notebooks').then(function(result){
    $scope.notebooks = result.data;
  });

  $http.get('/api/notes/' + $routeParams.id).then(function(result){
    $scope.note = result.data;
  });

}]);


notesApp.controller('notesController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

  $scope.notes = [];

  $scope.deleteNote = function(note){
    $http.delete('/api/notes/' + note._id).then(function(result){
      $http.get('/api/notebooks/' + $routeParams.id + '/notes').then(function(result){
        $scope.notes = result.data;
      });
    })
  };

  $http.get('/api/notebooks/' + $routeParams.id + '/notes').then(function(result){
    $scope.notes = result.data;
  });
}]);



notesApp.controller('tagsController', ['$scope', '$http', function($scope, $http){

  $scope.tags = [];

  $http.get('/api/tags').then(function(result){
    $scope.tags = result.data;
  });
}]);

notesApp.controller('tagsFormController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.tag = {};

  $scope.saveTag = function(){
    $http.post('/api/tags', $scope.tag).then(function(result){
      $scope.tag = {};
      $location.path('/tags');
    });
  };

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
