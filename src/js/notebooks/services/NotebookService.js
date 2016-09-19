class NotebookService {

  constructor($http){
    this.$http = $http;
  }

  loadNotebooks(){
    return this.$http
      .get('/api/notebooks')
      .then(result => result.data);
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
