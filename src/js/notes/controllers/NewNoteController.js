class NewNoteController {

  constructor($http, $location){
    this.$http = $http;
    this.$location = $location;
    this.resetNote();
    this.loadNotebooks();
  }

  save(){
    this.$http.post('/api/notes', this.note)
      .success(result => {

      })
      .error(error => {

      });
  }

  cancel(){
    this.resetNote();
    this.$location.path('/notebooks');
  }

  resetNote(){
    this.note = {};
  }

  loadNotebooks(){
    this.$http.get('/api/notebooks').then(result => this.notebooks = result.data);
  }

  loadTags(query) {
    return this.$http.get('/api/tags').then(result => {
      return result.data.map(item => ({ text: item.name, tagId: item._id }) );
    });
  };
}

NewNoteController.$inject = ['$http', '$location'];

export default NewNoteController;
