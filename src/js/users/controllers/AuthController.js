class AuthController {

  constructor($location, AuthService){
    if (AuthService.isLoggedIn()){
      $location.path('/notebooks');
    }

    this.AuthService = AuthService;
    this.$location = $location;
    this.user = { email: '', password: '' };
  }

  login(){
    this.AuthService
      .login(this.user)
      .error(err => {

      })
      .success(() => this.$location.path('/notebooks'));
  }

  logout(){
    this.AuthService.logout();
    this.$location.path('/users/login');
  }

}

AuthController.$inject = ['$location', 'AuthService'];

export default AuthController;
