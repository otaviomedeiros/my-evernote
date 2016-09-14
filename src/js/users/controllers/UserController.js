class UserController {

  constructor($location, $http, AuthService){
    this.$location = $location;
    this.$http = $http;
    this.AuthService = AuthService;

    this.loadUser();
  }

  cancel(){
    this.$location.path('/');
  }

  save(){
    this.$http.put(`/api/users/${this.user._id}`, this.user)
      .success(result => {
        this.$location.path('/');
      })
      .error(error => {
        
      });
  }

  loadUser(){
    this.$http.get(`/api/users/${this.AuthService.currentUser().id}`)
      .success(result => this.user = result)
      .error(error => {

      });
  }

}

UserController.$inject = ['$location', '$http', 'AuthService'];

export default UserController;
