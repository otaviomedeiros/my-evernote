angular.module('notesApp').controller('tagsController', ['$scope', '$http', 'authentication', 'Flash', function($scope, $http, authentication, Flash){

  $scope.tags = [];

  $scope.deleteTag = function(tag){
    $http.delete('/api/tags/' + tag._id)
      .success(function(result){
        Flash.create('Success', "Tag deleted", 3000, {}, false);
        $scope.loadTags();
      })
      .error(function(error){
        Flash.create('danger', error, 0, {}, false);
      });
  };

  $scope.loadTags = function(){
    $http.get('/api/tags').then(function(result){
      $scope.tags = result.data;
    });
  };

  $scope.loadTags();
}]);

angular.module('notesApp').controller('tagsFormController', ['$scope', '$http', '$location', 'authentication', 'Flash', function($scope, $http, $location, authentication, Flash){

  $scope.tag = {};

  $scope.saveTag = function(){
    $http.post('/api/tags', $scope.tag).then(function(result){
      $scope.tag = {};
      Flash.create('Success', 'Tag created with success!', 3000, {}, false);
      $location.path('/tags');
    });
  };

  $scope.cancelTag = function(){
    $scope.tag = {};
    $location.path('/tags');
  };

}]);

angular.module('notesApp').config(['$routeProvider', function($routeProvider){

  $routeProvider.
    when('/tags', {
      templateUrl: 'pages/tags/index.html',
      controller: 'tagsController'
    }).
    when('/tags/new', {
      templateUrl: 'pages/tags/form.html',
      controller: 'tagsFormController'
    });
}]);
