class NotesByTagController {

  constructor($http, $routeParams){
    this.$http = $http;
    this.notebookId = $routeParams.id;
    this.loadNotes();
  }

  delete(note){
    this.$http.delete(`/api/notes/${note._id}`)
      .success(result => {
        this.loadNotes();
      })
      .error(error => {

      });
  }

  loadNotes(){
    this.$http.get(`/api/tags/${this.notebookId}/notes`)
      .then(result => this.notes = result.data);
  }

};

NotesByTagController.$inject = ['$http', '$routeParams'];

export default NotesByTagController;
