class RegisterController {

  constructor($location, authService){
    this.authService = authService;
    this.$location = $location;
    this.serverErrors = [];
    this.user = { name: '', email: '', password: '' };
  }

  register(){
    this.authService
      .register(this.user)
      .error(err => console.log(err))
      .then(() => this.$location.path('/notebooks'));
  }

}

RegisterController.$inject = ['$location', 'authService'];

export default RegisterController;
