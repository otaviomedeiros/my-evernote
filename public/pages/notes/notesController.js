angular.module('notesApp').controller('newNoteController', ['$scope', '$http', '$location', 'authentication', 'Flash', function($scope, $http, $location, authentication, Flash){

  $scope.note = {};
  $scope.notebooks = [];

  $scope.saveNote = function(){
    $http.post('/api/notes', $scope.note)
      .success(function(result){
        Flash.create('Success', "Note saved", 3000, {}, false);
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  };

  $scope.cancelNote = function(){
    $scope.note = {};
    $location.path('/notebooks');
  };

  $http.get('/api/notebooks').then(function(result){
    $scope.notebooks = result.data;
  });

  $scope.loadTags = function(query) {
    return $http.get('/api/tags').then(function(result){
      return result.data.map(function(item){
        return {text: item.name, tagId: item._id};
      });
    });
  };

}]);


angular.module('notesApp').controller('notebookNotesController', ['$scope', '$http', '$routeParams', 'authentication', 'Flash', function($scope, $http, $routeParams, authentication, Flash){

  $scope.notes = [];

  $scope.deleteNote = function(note){
    $http.delete('/api/notes/' + note._id)
      .success(function(result){
        Flash.create('Success', "Note deleted", 3000, {}, false);
        $scope.loadNotes();
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  };

  $scope.loadNotes = function(){
    $http.get('/api/notebooks/' + $routeParams.id + '/notes').then(function(result){
      $scope.notes = result.data;
    });
  };

  $scope.loadNotes();
}]);


angular.module('notesApp').controller('editNoteController', ['$scope', '$http', '$location', '$routeParams', 'authentication', 'Flash', function($scope, $http, $location, $routeParams, authentication, Flash){

  $scope.note = {};
  $scope.notebooks = [];

  $scope.saveNote = function(){
    $http.put('/api/notes/' + $scope.note._id, $scope.note)
      .success(function(result){
        Flash.create('Success', "Note saved", 3000, {}, false);
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  };

  $scope.cancelNote = function(){
    $scope.note = {};
    $location.path('/notebooks');
  };

  $http.get('/api/notebooks').then(function(result){
    $scope.notebooks = result.data;
  });

  $http.get('/api/notes/' + $routeParams.id).then(function(result){
    $scope.note = result.data;
  });

  $scope.loadTags = function(query) {
    return $http.get('/api/tags').then(function(result){
      return result.data.map(function(item){
        return {text: item.name, tagId: item._id};
      });
    });
  };

}]);


angular.module('notesApp').controller('tagNotesController', ['$scope', '$http', '$routeParams', 'authentication', 'Flash', function($scope, $http, $routeParams, authentication, Flash){

  $scope.notes = [];

  $scope.deleteNote = function(note){
    $http.delete('/api/notes/' + note._id)
      .success(function(result){
        Flash.create('Success', "Note deleted", 3000, {}, false);
        $scope.loadNotes();
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  };

  $scope.loadNotes = function(){
    $http.get('/api/tags/' + $routeParams.id + '/notes').then(function(result){
      $scope.notes = result.data;
    });
  };

  $scope.loadNotes();

}]);


angular.module('notesApp').config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/notes/new', {
      templateUrl: 'pages/notes/form.html',
      controller: 'newNoteController'
    }).
    when('/notebooks/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'notebookNotesController'
    }).
    when('/notes/:id', {
      templateUrl: 'pages/notes/form.html',
      controller: 'editNoteController'
    }).
    when('/tags/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'tagNotesController'
    });
}]);
