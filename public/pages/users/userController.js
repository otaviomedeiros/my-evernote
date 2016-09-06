class UserController {

  constructor($location, $http, Flash){
    this.$location = $location;
    this.$http = $http;
    this.Flash = Flash;

    this.loadUser();
  }

  cancel(){
    this.$location.path('/');
  }

  save(){
    this.$http.put(`/api/users/${this.user._id}`, this.user)
      .success(result => {
        this.$location.path('/');
        this.Flash.create('Success', 'Profile updated with success!', 3000, {}, false);
      })
      .error(error => this.Flash.create('danger', error, 0, {}, false));
  }

  loadUser(){
    this.$http.get(`/api/users/${this.authentication.currentUser().id}`)
      .success(result => this.user = result)
      .error(error => this.Flash.create('danger', error, 0, {}, false));
  }

}

UserController.$inject = ['$location', '$http', 'Flash'];

exports default UserController;
