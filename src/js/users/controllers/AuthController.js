class AuthController {

  constructor($location, AuthService, Flash){
    if (AuthService.isLoggedIn()){
      $location.path('/notebooks');
    }

    this.Flash = Flash;
    this.AuthService = AuthService;
    this.$location = $location;
    this.user = { email: '', password: '' };
  }

  login(){
    this.Flash.clear();

    this.AuthService
      .login(this.user)
      .error(err => this.Flash.create('danger', err.message, 0, {}, false))
      .success(() => this.$location.path('/notebooks'));
  }

  logout(){
    this.AuthService.logout();
    this.$location.path('/users/login');
  }

}

AuthController.$inject = ['$location', 'AuthService', 'Flash'];

export default AuthController;
