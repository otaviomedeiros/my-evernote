class NotebooksController {

  constructor(notebookService, $http, $location, $routeParams){
    this.notebookService = notebookService;
    this.$http = $http;
    this.$location = $location;
    this.$routeParams = $routeParams;
  }

  create() {
    this.notebookService
      .create(this.notebook)
      .then(result => {
        this.resetNotebook();
        this.$location.path('/notebooks');
      });
  }

  update() {
    this.notebookService
      .update(this.notebook)
      .then(result => {
        this.$location.path('/notebooks');
        // flash
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

  loadNotebook(){
    this.notebookService
      .load(this.$routeParams.id)
      .then(notebook => this.notebook = notebook)
  }

  resetNotebook(){
    this.notebook = {};
  }
}

NotebooksController.$inject = ['notebookService', '$http', '$location', '$routeParams'];

export default NotebooksController;
