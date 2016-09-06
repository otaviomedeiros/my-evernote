class RegisterController {

  constructor($location, authentication){
    this.authentication = authentication;
    this.$location = $location;
    this.serverErrors = [];
    this.user = { name: '', email: '', password: '' };
  }

  register(){
    this.authentication
      .register(this.user)
      .error(err => console.log(err))
      .then(() => this.$location.path('/notebooks'));
  }

}

RegisterController.$inject = ['$location', 'authentication']

exports default RegisterController;
