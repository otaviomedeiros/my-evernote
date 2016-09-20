class NotebooksController {

  constructor(notebookService, $http, $location, $routeParams, flash){
    this.notebookService = notebookService;
    this.$http = $http;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.flash = flash;
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
    ).then(() => {
        this.$location.path('/notebooks');
        this.flash.success("Notebook saved with success");
      });
  }

  delete(notebook){
    this.notebookService
      .delete(notebook)
      .success(() => {
        this.index();
        this.flash.success("Notebook deleted with success")
      })
      .error(error => this.flash.error(error));
  }

  cancel() {
    this.$location.path('/notebooks');
  }

  resetNotebook(){
    this.notebook = {};
  }
}

NotebooksController.$inject = ['notebookService', '$http', '$location', '$routeParams', 'flash'];

export default NotebooksController;
