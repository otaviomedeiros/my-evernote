class NotebooksController {

  constructor(notebookService){
    this.notebookService = notebookService;
    this.load();
  }

  delete(notebook){
    this.notebookService
      .delete(notebook)
      .success(result => {
        this.load();
        // flash
      })
      .error(error => {
        // flash
      })
  }

  load(){
    this.notebookService
      .loadNotebooks()
      .then(notebooks => this.notebooks = notebooks);
  }
}

NotebooksController.$inject = ['notebookService'];

export default NotebooksController;
