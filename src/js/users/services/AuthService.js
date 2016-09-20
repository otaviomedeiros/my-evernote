class AuthService {

  constructor($http, $window){
    this.$window = $window;
    this.$http = $http;
  }

  saveToken(token){
    this.$window.localStorage['note-app-token'] = token;
  }

  getToken(){
    return this.$window.localStorage['note-app-token'];
  }

  logout(){
    this.$window.localStorage.removeItem('note-app-token');
  }

  isLoggedIn(){
    var token = this.getToken();

    if(token){
      var payload = token.split('.')[1];
      payload = this.$window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  currentUser(){
    if (this.isLoggedIn()){
      var token = this.getToken();
      var payload = token.split('.')[1];
      payload = this.$window.atob(payload);
      payload = JSON.parse(payload);

      return { id: payload._id, email: payload.email, name: payload.name };
    }
  }

  register(user){
    return this.$http.post('/auth/register', user)
      .success(result => this.saveToken(result.token));
  }

  login(user) {
    return this.$http.post('/auth/login', user)
      .success(result => this.saveToken(result.token));
  }

  static factory($http, $window){
    return new AuthService($http, $window);
  }
}


AuthService.factory.$inject = ['$http', '$window'];

export default AuthService.factory;
