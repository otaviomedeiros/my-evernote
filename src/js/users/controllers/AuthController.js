class AuthController {

  constructor($location, authService){
    if (authService.isLoggedIn()){
      $location.path('/notebooks');
    }

    this.authService = authService;
    this.$location = $location;
    this.user = { email: '', password: '' };
  }

  login(){
    this.authService
      .login(this.user)
      .error(err => {
        // flash
      })
      .success(() => this.$location.path('/notebooks'));
  }

  logout(){
    this.authService.logout();
    this.$location.path('/users/login');
  }

}

AuthController.$inject = ['$location', 'authService'];

export default AuthController;
