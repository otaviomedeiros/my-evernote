class NavigationController {

  constructor(AuthService){
    this.AuthService = AuthService;
  }

  isLoggedIn(){
    return this.AuthService.isLoggedIn();
  }

  user(){
    return this.AuthService.currentUser();
  }

}

NavigationController.$inject = ['AuthService'];

export default NavigationController;
