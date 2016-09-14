class NotesByNotebookController {

  constructor($http, $routeParams){
    this.$http = $http;
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
        this.loadNotes();
      })
      .error(error => {

      });
  }

}

NotesByNotebookController.$inject = ['$http', '$routeParams'];

export default NotesByNotebookController;
