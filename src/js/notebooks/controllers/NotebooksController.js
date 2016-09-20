class NotebooksController {

  constructor(notebookService, $http, $location, $routeParams){
    this.notebookService = notebookService;
    this.$http = $http;
    this.$location = $location;
    this.$routeParams = $routeParams;
  }

  index(){
    this.notebookService
      .loadNotebooks()
      .then(notebooks => this.notebooks = notebooks);
  }

  new(){
    this.resetNotebook();
  }

  edit(){
    this.resetNotebook();
    this.notebookService
      .load(this.$routeParams.id)
      .then(notebook => this.notebook = notebook)
  }

  save(){
    (
      this.$routeParams.id ?
        this.notebookService.update(this.notebook) :
        this.notebookService.create(this.notebook)
    ).then(result => {
        this.$location.path('/notebooks');
        // flash
      });
  }
  
  delete(notebook){
    this.notebookService
      .delete(notebook)
      .success(result => {
        this.index();
        // flash
      })
      .error(error => {
        // flash
      })
  }

  cancel() {
    this.$location.path('/notebooks');
  }

  resetNotebook(){
    this.notebook = {};
  }
}

NotebooksController.$inject = ['notebookService', '$http', '$location', '$routeParams'];

export default NotebooksController;
