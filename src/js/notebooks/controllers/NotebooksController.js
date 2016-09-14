class NotebooksController {

  constructor($http){
    this.notebooks = [];
    this.$http = $http;
    this.loadNotebooks();
  }

  delete(notebook){
    this.$http.delete('/api/notebooks/' + notebook._id)
      .success(result => {
        this.loadNotebooks();
      })
      .error(error => {
        
      });
  }

  loadNotebooks(){
    this.$http.get('/api/notebooks').then(result => this.notebooks = result.data);
  }
}

NotebooksController.$inject = ['$http'];

export default NotebooksController;
