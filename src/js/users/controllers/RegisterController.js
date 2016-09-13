class RegisterController {

  constructor($location, AuthService){
    this.AuthService = AuthService;
    this.$location = $location;
    this.serverErrors = [];
    this.user = { name: '', email: '', password: '' };
  }

  register(){
    this.AuthService
      .register(this.user)
      .error(err => console.log(err))
      .then(() => this.$location.path('/notebooks'));
  }

}

RegisterController.$inject = ['$location', 'AuthService'];

export default RegisterController;
