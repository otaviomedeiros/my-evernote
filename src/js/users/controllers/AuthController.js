class AuthController {

  constructor($location, authService, flash){
    if (authService.isLoggedIn()){
      $location.path('/notebooks');
    }

    this.flash = flash;
    this.authService = authService;
    this.$location = $location;
    this.user = { email: '', password: '' };
  }

  login(){
    this.authService
      .login(this.user)
      .error(err => this.flash.error(err.message))
      .success(() => this.$location.path('/notebooks'));
  }

  logout(){
    this.authService.logout();
    this.$location.path('/users/login');
  }

}

AuthController.$inject = ['$location', 'authService', 'flash'];

export default AuthController;
