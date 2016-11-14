class AuthInterceptor {

  constructor($window){
    this.$window = $window;
  }

  request(config){
    //config.headers['Authorization'] = `Bearer ${this.$window.localStorage['note-app-token']}`;
    config.headers['Authorization'] = `Bearer ${window.localStorage['note-app-token']}`;
    return config;
  }

  static serviceFactory($window){
    return new AuthInterceptor($window);
  }

}

AuthInterceptor.serviceFactory.$inject = ['$window'];

export default AuthInterceptor.serviceFactory;
