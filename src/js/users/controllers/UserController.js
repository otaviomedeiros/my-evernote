class UserController {

  constructor($location, userService, authService, flash){
    this.$location = $location;
    this.userService = userService;
    this.authService = authService;
    this.flash = flash;
  }

  cancel(){
    this.$location.path('/');
  }

  save(){
    this.userService
      .update(this.user)
      .success(() => {
        this.$location.path('/');
        this.flash.success("User created with success");
      })
      .error(error => this.flash.error(error));
  }

  edit(){
    this.userService
      .load(this.authService.currentUser().id)
      .then(user => this.user = user);
  }

}

UserController.$inject = ['$location', 'userService', 'authService', 'flash'];

export default UserController;
