class NotebooksController {

  constructor(notebookService, $http, $location){
    this.notebookService = notebookService;
    this.$http = $http;
    this.$location = $location;
  }

  create() {
    this.notebookService
      .create(this.notebook)
      .then(result => {
        this.resetNotebook();
        this.$location.path('/notebooks');
      });
  }

  delete(notebook){
    this.notebookService
      .delete(notebook)
      .success(result => {
        this.loadNotebooks();
        // flash
      })
      .error(error => {
        // flash
      })
  }

  cancel() {
    this.resetNotebook();
    this.$location.path('/notebooks');
  };

  loadNotebooks(){
    this.notebookService
      .loadNotebooks()
      .then(notebooks => this.notebooks = notebooks);
  }

  resetNotebook(){
    this.notebook = {};
  }
}

NotebooksController.$inject = ['notebookService', '$http', '$location'];

export default NotebooksController;
