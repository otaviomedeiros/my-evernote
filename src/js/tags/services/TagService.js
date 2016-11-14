class TagService {

  constructor($http){
    this.$http = $http;
  }

  save(tag){
    return this.$http.post('/api/tags', tag);
  }

  delete(tag){
    return this.$http.delete(`/api/tags/${tag._id}`);
  }

  loadTags(){
    return this.$http
      .get('/api/tags')
      .then(result => result.data);
  }

  static factory($http){
    return new TagService($http);
  }

}

TagService.factory.$inject = ["$http"];

export default TagService.factory;
