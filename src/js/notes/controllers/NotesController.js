class NotesController {

  constructor(notebookService, noteService, $routeParams, $location){
    this.notebookService = notebookService;
    this.noteService = noteService;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.loadNotebooks();
  }

  save(){
    (
      this.$routeParams.id ?
        this.noteService.update(this.note) :
        this.noteService.create(this.note)
    ).success(result => {
      // flash
    }).error(error => {
      // flash
    })
  }

  cancel(){
    this.resetNote();
    this.$location.path('/notebooks');
  }

  loadNotebooks(){
    this.notebookService
      .loadNotebooks()
      .then(notebooks => this.notebooks = notebooks)
  }

  resetNote(){
    this.note = {};
  }

  loadNote(){
    this.noteService
      .load(this.$routeParams.id)
      .then(note => this.note = note);
  }

  loadTags(query) {
    return this.noteService.loadTags();
  };

}

NotesController.$inject = ["notebookService", "noteService", "$routeParams", "$location"];

export default NotesController;
