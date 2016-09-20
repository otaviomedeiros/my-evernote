class UserController {

  constructor($location, userService, authService){
    this.$location = $location;
    this.userService = userService;
    this.authService = authService;
  }

  cancel(){
    this.$location.path('/');
  }

  save(){
    this.userService
      .update(this.user)
      .success(result => {
        this.$location.path('/');
        // flash
      })
      .error(error => {
        // flash
      });
  }

  edit(){
    this.userService
      .load(this.authService.currentUser().id)
      .then(user => this.user = user);
  }

}

UserController.$inject = ['$location', 'userService', 'authService'];

export default UserController;
