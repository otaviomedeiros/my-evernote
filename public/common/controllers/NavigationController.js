class NavigationController {

  constructor(authentication){
    this.authentication = authentication;
  }

  isLoggedIn(){
    return this.authentication.isLoggedIn();
  }

  user(){
    return this.authentication.currentUser();
  }

}

NavigationController.$inject = ['authentication'];

exports default NavigationController;
