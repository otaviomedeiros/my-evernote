var notesApp = angular.module('notesApp', ['ngRoute', 'textAngular', 'ngTagsInput']);

notesApp.config(['$routeProvider', function($routeProvider){

  $routeProvider.
    when('/users/register', {
      templateUrl: 'pages/users/register.html',
      controller: 'registerController'
    }).
    when('/users/login', {
      templateUrl: 'pages/users/login.html',
      controller: 'authController'
    }).
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
      controller: 'notebookNotesController'
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
    }).
    when('/tags/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'tagNotesController'
    });
}]);


notesApp.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}]);


notesApp.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication){
  $rootScope.$on('$routeChangeStart', function(){
    if ($location.path() !== '/users/login' && $location.path() !== '/users/register' && !authentication.isLoggedIn()){
      $location.path('/users/login');
    }
  });
}]);


notesApp.controller('navigationController', ['$scope', 'authentication', function($scope, authentication){

  $scope.isLoggedIn = function(){
    return authentication.isLoggedIn();
  };

}]);


notesApp.controller('notebooksController', ['$scope', '$http', '$location', 'authentication', function($scope, $http, $location, authentication){

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

notesApp.controller('notebookFormController', ['$scope', '$http', '$location', '$routeParams', 'authentication', function($scope, $http, $location, $routeParams, authentication){

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

notesApp.controller('newNoteController', ['$scope', '$http', 'authentication', function($scope, $http, authentication){

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

  $scope.loadTags = function(query) {
    return $http.get('/api/tags').then(function(result){
      return result.data.map(function(item){
        return {text: item.name, tagId: item._id};
      });
    });
  };

}]);


notesApp.controller('editNoteController', ['$scope', '$http', '$routeParams', 'authentication', function($scope, $http, $routeParams, authentication){

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

  $scope.loadTags = function(query) {
    return $http.get('/api/tags').then(function(result){
      return result.data.map(function(item){
        return {text: item.name, tagId: item._id};
      });
    });
  };

}]);


notesApp.controller('notebookNotesController', ['$scope', '$http', '$routeParams', 'authentication', function($scope, $http, $routeParams, authentication){

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


notesApp.controller('tagNotesController', ['$scope', '$http', '$routeParams', 'authentication', function($scope, $http, $routeParams, authentication){

  $scope.notes = [];

  $scope.deleteNote = function(note){
    $http.delete('/api/notes/' + note._id).then(function(result){
      $http.get('/api/tags/' + $routeParams.id + '/notes').then(function(result){
        $scope.notes = result.data;
      });
    })
  };

  $http.get('/api/tags/' + $routeParams.id + '/notes').then(function(result){
    $scope.notes = result.data;
  });

}]);


notesApp.controller('tagsController', ['$scope', '$http', 'authentication', function($scope, $http, authentication){

  $scope.tags = [];

  $http.get('/api/tags').then(function(result){
    $scope.tags = result.data;
  });
}]);

notesApp.controller('tagsFormController', ['$scope', '$http', '$location', 'authentication', function($scope, $http, $location, authentication){

  $scope.tag = {};

  $scope.saveTag = function(){
    $http.post('/api/tags', $scope.tag).then(function(result){
      $scope.tag = {};
      $location.path('/tags');
    });
  };

}]);


notesApp.controller('registerController', ['$scope', '$location', 'authentication', function($scope, $location, authentication){

  $scope.user = { name: '', email: '', password: '' };

  $scope.register = function(){
    authentication
      .register($scope.user)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('/notebooks');
      });
  }

}]);

notesApp.controller('authController', ['$scope', '$location', 'authentication', function($scope, $location, authentication){

  $scope.user = { email: '', password: '' };

  $scope.login = function(){
    authentication
      .login($scope.user)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('/notebooks');
      });
  };

  $scope.logout = function(){
    authentication.logout();
    $location.path('/users/login');
  };

}]);


// --------
// Services

notesApp.service('authentication', ['$window', '$http', function($window, $http){

  var saveToken = function(token){
    $window.localStorage['note-app-token'] = token;
  };

  var getToken = function(){
    return $window.localStorage['note-app-token'];
  };

  var logout = function(){
    $window.localStorage.removeItem('note-app-token');
  };

  var isLoggedIn = function(){
    var token = getToken();

    if(token){
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function(){
    if (isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return { email: payload.email, name: payload.name };
    }
  };

  var register = function(user){
    return $http.post('/auth/register', user).success(function(result){
      saveToken(result.token);
    });
  };

  var login = function(user) {
    return $http.post('/auth/login', user).success(function(result) {
      saveToken(result.token);
    });
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    register : register,
    login : login,
    logout : logout
  };

}]);


notesApp.service('authInterceptor', ['$window', function($window){
  return {
    request: function(config){
      config.headers['Authorization'] = 'Bearer ' + $window.localStorage['note-app-token'];
      return config;
    }
  };
}]);



// --------
// Filters
notesApp.filter('htmlToPlaintext', function() {
  return function(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
});

notesApp.filter('notecontent', function() {
  return function(noteContent) {
    return noteContent ? noteContent.substr(0, 580) : '';
  }
});
