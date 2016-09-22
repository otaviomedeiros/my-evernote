class NotebookSelectorController {

  constructor(notebookService, $rootScope){
    this.notebooks = [];
    this.notebookService = notebookService;

    $rootScope.$on("notebook:list", () => this.loadNotebooks());
  }

  loadNotebooks(){
    this.notebookService
      .loadNotebooks()
      .then(notebooks => this.notebooks = notebooks);
  }

}

NotebookSelectorController.$inject = ["notebookService", "$rootScope"];

export default NotebookSelectorController;
