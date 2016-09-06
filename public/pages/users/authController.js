class AuthController {

  constructor($location, authentication, Flash){
    if (authentication.isLoggedIn()){
      $location.path('/notebooks');
    }

    this.Flash = Flash;
    this.authentication = authentication;
    this.$location = $location;
    this.user = { email: '', password: '' };
  }

  login(){
    this.Flash.clear();

    this.authentication
      .login(this.user)
      .error(err => this.Flash.create('danger', err.message, 0, {}, false))
      .success(() => this.$location.path('/notebooks'));
  }

  logout(){
    this.authentication.logout();
    this.$location.path('/users/login');
  }

}

AuthController.$inject = ['$location', 'authentication', 'Flash'];

exports default AuthController;
