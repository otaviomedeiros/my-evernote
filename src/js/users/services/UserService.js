class UserService {

  constructor($http){
    this.$http = $http;
  }

  update(user){
    return this.$http
      .put(`/api/users/${user._id}`, user);
  }

  load(id){
    return this.$http
      .get(`/api/users/${id}`)
      .then(result => result.data);
  }

  static factory($http){
    return new UserService($http);
  }

}

UserService.factory.$inject = ["$http"];

export default UserService.factory;
