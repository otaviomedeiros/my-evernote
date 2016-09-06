class AuthInterceptor {

  constructor($window){
    this.$window = $window;
  }

  request(config){
    config.headers['Authorization'] = `Bearer ${this.$window.localStorage['note-app-token']}`;
    return config;
  }

  static serviceFactory($window){
    return new AuthInterceptor($window)
  }
  
}

AuthInterceptor.$inject = ['$window'];

exports default AuthInterceptor.serviceFactory;
