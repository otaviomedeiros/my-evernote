class NotebooksController {

  constructor($http, Flash){
    this.notebooks = [];
    this.$http = $http;
    this.Flash = Flash;
    this.loadNotebooks();
  }

  delete(notebook){
    this.$http.delete('/api/notebooks/' + notebook._id)
      .success(result => {
        this.Flash.create('Success', "Notebook deleted", 3000, {}, false);
        this.loadNotebooks();
      })
      .error(error => this.Flash.create('danger', error, 0, {}, false));
  }

  loadNotebooks(){
    this.$http.get('/api/notebooks').then(result => this.notebooks = result.data);
  }
}

NotebooksController.$inject = ['$http', 'Flash'];

export default NotebooksController;
