class EditNoteboookController {

  constructor($routeParams, $http, $location){
    this.$http = $http;
    this.$location = $location;
    this.loadNotebook($routeParams.id);
  }

  save() {
    this.$http.put(`/api/notebooks/${this.notebook._id}`, this.notebook).then(result => {
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

EditNoteboookController.$inject = ['$routeParams', '$http', '$location'];

export default EditNoteboookController;
