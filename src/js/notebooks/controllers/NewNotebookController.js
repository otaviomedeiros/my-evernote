class NewNoteboookController {

  constructor($http, $location, Flash){
    this.resetNotebook();
    this.$http = $http;
    this.$location = $location;
    this.Flash = Flash;
  }

  save() {
    this.$http.post('/api/notebooks', this.notebook).then(result => {
      this.resetNotebook();
      this.Flash.create('Success', 'Notebook created with success!', 3000, {}, false);
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

NewNoteboookController.$inject = ['$http', '$location', 'Flash'];

export default NewNoteboookController;
