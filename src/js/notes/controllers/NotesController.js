class NotesController {

  constructor(notebookService, noteService, $routeParams, $location, flash){
    this.notebookService = notebookService;
    this.noteService = noteService;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.flash = flash;
  }

  indexByNotebook(){
    this.noteService
      .loadNotesByNotebook(this.$routeParams.id)
      .then(notes => this.notes = notes);
  }

  indexByNote(){
    this.noteService
      .loadNotesByTag(this.$routeParams.id)
      .then(notes => this.notes = notes);
  }

  create(){
    if (!this.note._id) {
      this.noteService
      .create(this.note)
      .success((note) => {
        this.note = note;
        this.flash.success("Note Saved with success")
      })
      .error(error => this.flash.error(error));
    }
  }

  done(){
    this.noteService
      .update(this.note)
      .success(() => {
        this.$location.path("/notebooks");
        this.flash.success("Note Saved with success")}
      )
      .error(error => this.flash.error(error));
  }

  delete(note){
    this.noteService
      .delete(note)
      .success(() => {
        this.loadNotes();
        this.flash.success("Note deleted with success");
      })
      .error(error => this.flash.error(error));
  }

  cancel(){
    this.$location.path('/notebooks');
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
  }

}

NotesController.$inject = ["notebookService", "noteService", "$routeParams", "$location", "flash"];

export default NotesController;
