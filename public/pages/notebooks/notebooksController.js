angular.module('notesApp').controller('notebooksController', ['$scope', '$http', '$location', 'authentication', 'Flash', function($scope, $http, $location, authentication, Flash){

  $scope.notebooks = [];

  $scope.deleteNotebook = function(notebook){
    $http.delete('/api/notebooks/' + notebook._id)
      .success(function(result){
        Flash.create('Success', "Notebook deleted", 3000, {}, false);
        $scope.loadNotebooks();
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  };

  $scope.loadNotebooks = function(){
    $http.get('/api/notebooks').then(function(result){
      $scope.notebooks = result.data;
    });
  };

  $scope.loadNotebooks();
}]);


angular.module('notesApp').controller('notebookFormController', ['$scope', '$http', '$location', '$routeParams', 'authentication', 'Flash', function($scope, $http, $location, $routeParams, authentication, Flash){

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
      Flash.create('Success', 'Notebook created with success!', 3000, {}, false);
      $location.path('/notebooks');
    });
  };

  $scope.updateNotebook = function(){
    $http.put('/api/notebooks/' + $scope.notebook._id, $scope.notebook).then(function(result){
      $scope.notebook = {};
      Flash.create('Success', 'Notebook changed with success!', 3000, {}, false);
      $location.path('/notebooks');
    });
  };

  $scope.cancelNotebook = function(){
    $scope.notebook = {};
    $location.path('/notebooks');
  };

}]);


angular.module('notesApp').config(['$routeProvider', function($routeProvider){
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
    })
}]);
