class NewNoteboookController {

  constructor($http, $location){
    this.resetNotebook();
    this.$http = $http;
    this.$location = $location;
  }

  save() {
    this.$http.post('/api/notebooks', this.notebook).then(result => {
      this.resetNotebook();
      this.$location.path('/notebooks');
    });
  }

  cancel() {
    this.resetNotebook();
    this.$location.path('/notebooks');
  };

  resetNotebook(){
    this.notebook = {};
  }

}

NewNoteboookController.$inject = ['$http', '$location'];

export default NewNoteboookController;
