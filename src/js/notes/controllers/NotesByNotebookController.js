class NotesByNotebookController {

  constructor($http, $routeParams, Flash){
    this.$http = $http;
    this.Flash = Flash;
    this.notebookId = $routeParams.id;
    this.loadNotes();
  }

  loadNotes(){
    this.$http.get(`/api/notebooks/${this.notebookId}/notes`)
      .then(result => this.notes = result.data);
  }

  delete(note){
    this.$http.delete(`/api/notes/${note._id}`)
      .success(result => {
        this.Flash.create('Success', "Note deleted", 3000, {}, false);
        this.loadNotes();
      })
      .error(error => this.Flash.create('danger', error, 0, {}, false));
  }

}

NotesByNotebookController.$inject = ['$http', '$routeParams', 'Flash'];

export default NotesByNotebookController;
