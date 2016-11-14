class NotebookService {

  constructor($http){
    this.$http = $http;
  }

  loadNotebooks(){
    return this.$http
      .get('/api/notebooks')
      .then(result => result.data);
  }

  load(id){
    return this.$http
      .get(`/api/notebooks/${id}`)
      .then(result => result.data);
  }

  create(notebook){
    return this.$http
      .post('/api/notebooks', notebook);
  }

  update(notebook){
    return this.$http
      .put(`/api/notebooks/${notebook._id}`, notebook);
  }

  delete(notebook){
    return this.$http
      .delete('/api/notebooks/' + notebook._id)
  }

  static factory($http){
    return new NotebookService($http);
  }
}

NotebookService.factory.$inject = ["$http"];

export default NotebookService.factory;
