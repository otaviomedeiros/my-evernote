class NotesByTagController {

  constructor($http, $routeParams, Flash){
    this.$http = $http;
    this.Flash = Flash;
    this.notebookId = $routeParams.id;
    this.loadNotes();
  }

  delete(note){
    this.$http.delete(`/api/notes/${note._id}`)
      .success(result => {
        this.Flash.create('Success', "Note deleted", 3000, {}, false);
        this.loadNotes();
      })
      .error(error => this.Flash.create('danger', error, 0, {}, false));
  }

  loadNotes(){
    this.$http.get(`/api/tags/${this.notebookId}/notes`)
      .then(result => this.notes = result.data);
  }

};

NotesByTagController.$inject = ['$http', '$routeParams', 'Flash'];

export default NotesByTagController;
