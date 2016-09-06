class TagsController {

  constructor($http, Flash){
    this.$http = $http;
    this.Flash = Flash;

    this.loadTags();
  }

  deleteTag(tag){
    this.$http.delete(`/api/tags/${tag._id}`)
      .success(result => {
        this.Flash.create('Success', "Tag deleted", 3000, {}, false);
        this.loadTags();
      })
      .error(error => this.Flash.create('danger', error, 0, {}, false));
  }

  loadTags(){
    this.$http.get('/api/tags')
      .then(result => this.tags = result.data);
  }

}

TagsController.$inject = ['$http', 'Flash'];

exports default TagsController;
