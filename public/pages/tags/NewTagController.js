class NewTagController {

  constructor($http, $location, Flash){
    this.$location = $location;
    this.$http = $http;
    this.Flash = Flash;
  }

  saveTag(){
    this.$http.post('/api/tags', this.tag)
      .then(result => {
        this.resetTag();
        this.Flash.create('Success', 'Tag created with success!', 3000, {}, false);
        this.$location.path('/tags');
      });
  }

  cancelTag(){
    this.resetTag();
    this.$location.path('/tags');
  }

  resetTag(){
    this.tag = {};
  }

}

NewTagController.$inject = ['$http', '$location', 'Flash'];

exports default NewTagController;
