class EditNoteboookController {

  constructor($routeParams, $http, $location, Flash){
    this.loadNotebook($routeParams.id);
    this.$http = $http;
    this.$location = $location;
    this.Flash = Flash;
  }

  save() {
    this.$http.put(`/api/notebooks/${this.notebook._id}`, this.notebook).then(result => {
      this.Flash.create('Success', 'Notebook changed with success!', 3000, {}, false);
      this.$location.path('/notebooks');
    });
  }

  cancel() {
    this.$location.path('/notebooks');
  }

  loadNotebook(notebookId){
    this.$http.get(`/api/notebooks/${notebookId}`).then(result => this.notebook = result.data);
  }

}

EditNoteboookController.$inject = ['$routeParams', '$http', '$location', 'Flash'];

exports default EditNoteboookController;
