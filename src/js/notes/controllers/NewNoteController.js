class NewNoteController {

  constructor($http, $location, Flash){
    this.$http = $http;
    this.$location = $location;
    this.Flash = Flash;
    this.resetNote();
    this.loadNotebooks();
  }

  save(){
    this.$http.post('/api/notes', this.note)
      .success(result => this.Flash.create('Success', "Note saved", 3000, {}, false))
      .error(error => this.Flash.create('danger', error, 0, {}, false));
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

NewNoteController.$inject = ['$http', '$location', 'Flash'];

export default NewNoteController;
