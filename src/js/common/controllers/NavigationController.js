class NavigationController {

  constructor(authService){
    this.authService = authService;
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  user(){
    return this.authService.currentUser();
  }

}

NavigationController.$inject = ['authService'];

export default NavigationController;
