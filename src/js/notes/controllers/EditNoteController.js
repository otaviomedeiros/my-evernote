class EditNoteController {

  constructor($http, $location, $routeParams){
    this.$http = $http;
    this.$location = $location;

    this.loadNotebooks();
    this.loadNote($routeParams.id);
  }

  save(){
    this.$http.put(`/api/notes/${this.note._id}`, this.note)
      .success(result => {

      })
      .error(error => {

      });
  }

  cancel(){
    this.$location.path('/notebooks');
  }

  loadNotebooks(){
    this.$http.get('/api/notebooks')
      .then(result => this.notebooks = result.data);
  }

  loadNote(id){
    this.$http.get(`/api/notes/${id}`)
      .then(result => this.note = result.data);
  }

  loadTags(query) {
    return this.$http.get('/api/tags').then(result => {
      return result.data.map(item => ({ text: item.name, tagId: item._id }));
    });
  }
}

EditNoteController.$inject = ['$http', '$location', '$routeParams'];

export default EditNoteController;
