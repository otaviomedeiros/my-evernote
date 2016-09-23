class NoteService {

  constructor($http){
    this.$http = $http;
  }

  load(id){
    return this.$http
      .get(`/api/notes/${id}`)
      .then(result => result.data);
  }

  loadNotesByNotebook(notebookId){
    return this.$http
      .get(`/api/notebooks/${notebookId}/notes`)
      .then(result => result.data);
  }

  loadNotesByTag(tagId){
    return this.$http
      .get(`/api/tags/${tagId}/notes`)
      .then(result => result.data);
  }

  loadTags(){
    return this.$http
      .get('/api/tags')
      .then(result => {
        return result.data.map(item => ({ text: item.name, tagId: item._id }) );
      });
  }

  create(note){
    return this.$http
      .post('/api/notes', note)
      .success(result => result.data);
  }

  update(note){
    return this.$http.put(`/api/notes/${note._id}`, note);
  }

  delete(note){
    return this.$http.delete(`/api/notes/${note._id}`);
  }

  static factory($http){
    return new NoteService($http);
  }

}

NoteService.factory.$inject = ["$http"];

export default NoteService.factory;
