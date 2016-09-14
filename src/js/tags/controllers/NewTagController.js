class NewTagController {

  constructor($http, $location){
    this.$location = $location;
    this.$http = $http;
  }

  save(){
    this.$http.post('/api/tags', this.tag)
      .then(result => {
        this.resetTag();
        this.$location.path('/tags');
      });
  }

  cancel(){
    this.resetTag();
    this.$location.path('/tags');
  }

  resetTag(){
    this.tag = {};
  }

}

NewTagController.$inject = ['$http', '$location'];

export default NewTagController;
