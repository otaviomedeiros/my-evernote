angular.module('notesApp').service('authentication', ['$window', '$http', function($window, $http){

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

      return { id: payload._id, email: payload.email, name: payload.name };
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
