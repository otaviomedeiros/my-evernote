class TagsController {

  constructor($http){
    this.$http = $http;

    this.loadTags();
  }

  delete(tag){
    this.$http.delete(`/api/tags/${tag._id}`)
      .success(result => {
        this.loadTags();
      })
      .error(error => {

      });
  }

  loadTags(){
    this.$http.get('/api/tags')
      .then(result => this.tags = result.data);
  }

}

TagsController.$inject = ['$http'];

export default TagsController;
