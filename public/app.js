var notesApp = angular.module('notesApp', ['ngRoute', 'ngMessages', 'textAngular', 'ngTagsInput', 'ngFlash', 'underscore', 'ui.gravatar']);

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._;
}]);

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
    when('/user/settings', {
      templateUrl: 'pages/users/settings.html',
      controller: 'userSettingsController'
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
    }).
    otherwise({ redirectTo: '/users/login' });
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


notesApp.controller('userSettingsController', ['$scope', 'authentication', function($scope, authentication){

  $scope.user = authentication.currentUser();

}]);

notesApp.controller('navigationController', ['$scope', 'authentication', function($scope, authentication){

  $scope.isLoggedIn = function(){
    return authentication.isLoggedIn();
  };

  $scope.user = function(){
    return authentication.currentUser();
  };

}]);


notesApp.controller('notebooksController', ['$scope', '$http', '$location', 'authentication', 'Flash', function($scope, $http, $location, authentication, Flash){

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

notesApp.controller('notebookFormController', ['$scope', '$http', '$location', '$routeParams', 'authentication', 'Flash', function($scope, $http, $location, $routeParams, authentication, Flash){

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

notesApp.controller('newNoteController', ['$scope', '$http', '$location', 'authentication', 'Flash', function($scope, $http, $location, authentication, Flash){

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


notesApp.controller('editNoteController', ['$scope', '$http', '$location', '$routeParams', 'authentication', 'Flash', function($scope, $http, $location, $routeParams, authentication, Flash){

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


notesApp.controller('notebookNotesController', ['$scope', '$http', '$routeParams', 'authentication', 'Flash', function($scope, $http, $routeParams, authentication, Flash){

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


notesApp.controller('tagNotesController', ['$scope', '$http', '$routeParams', 'authentication', 'Flash', function($scope, $http, $routeParams, authentication, Flash){

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


notesApp.controller('tagsController', ['$scope', '$http', 'authentication', 'Flash', function($scope, $http, authentication, Flash){

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

notesApp.controller('tagsFormController', ['$scope', '$http', '$location', 'authentication', 'Flash', function($scope, $http, $location, authentication, Flash){

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


notesApp.controller('registerController', ['$scope', '$location', 'authentication', function($scope, $location, authentication){

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

notesApp.controller('authController', ['$scope', '$location', 'authentication', 'Flash', function($scope, $location, authentication, Flash){

  if (authentication.isLoggedIn()){
    $location.path('/notebooks');
  }

  $scope.user = { email: '', password: '' };

  $scope.login = function(){
    Flash.clear();

    authentication
      .login($scope.user)
      .error(function(err){
        Flash.create('danger', err.message, 0, {}, false);
      })
      .success(function(){
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




// directives
notesApp.directive('emailAlreadyInUse', ['$q', '$http', function($q, $http){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, emailNgModel){
      emailNgModel.$asyncValidators.alreadyinuse = function(modelValue, viewValue){
        return $q(function(resolve, reject){
          $http.get('/auth/email/' + viewValue).success(function(){
            reject();
          }).error(function(){
            resolve();
          })
        });
      };
    }
  };
}]);

notesApp.directive('uniqueNotebook', ['$q', '$http', function($q, $http){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, nameNgModel){
      nameNgModel.$asyncValidators.unique = function(modelValue, viewValue){
        return $q(function(resolve, reject){
          $http.get('/api/notebooks', { params: { name: viewValue } })
            .success(function(notes){
              if (notes.length > 0) {
                reject();
              } else {
                resolve();
              }
            })
            .error(function(){
              reject();
            })
        });
      }
    }
  }
}]);

notesApp.directive('uniqueTag', ['$q', '$http', function($q, $http){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, tagNameNgModel){
      tagNameNgModel.$asyncValidators.unique = function(modelValue, viewValue){
        return $q(function(resolve, reject){
          $http.get('/api/tags', { params: { name: viewValue } })
            .success(function(tags){
              if (tags.length > 0) {
                reject();
              } else {
                resolve();
              }
            })
            .error(function(){
              reject();
            });
        });
      }
    }
  }
}]);


notesApp.directive('confirm', function(){
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attrs){
        element.bind('click', function(){
          if (!confirm(attrs.confirm)) {
            event.stopImmediatePropagation();
            event.preventDefault;
          }
        });
      }
    }
  }
});


notesApp.directive('menuItem', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      elem.find('a').on('click', function(){
        elem.siblings('[menu-item]').removeClass('active');
        elem.addClass('active');
      });
    }
  }
}]);


notesApp.directive('showActionsHover', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      elem.on('mouseenter', function(){
        elem.find('[actions-hover]').show();
      });

      elem.on('mouseleave', function(){
        elem.find('[actions-hover]').hide();
      });
    }
  }
}]);


notesApp.directive('hideMenu', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      $('nav').hide();
      scope.$on('$destroy', function(){
        $('nav').show();
      });
    }
  }
}]);
