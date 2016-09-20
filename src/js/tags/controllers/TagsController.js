class TagsController {

  constructor(tagService, $location){
    this.tagService = tagService;
    this.$location = $location;
  }

  save(){
    this.tagService
      .save(this.tag)
      .then(result => {
        this.resetTag();
        this.$location.path('/tags');
        // flash
      });
  }

  delete(tag){
    this.tagService
      .delete(tag)
      .success(result => {
        this.loadTags();
        // flash
      })
      .error(error => {
        //flash
      });
  }

  cancel(){
    this.resetTag();
    this.$location.path('/tags');
  }
  
  loadTags(){
    this.tagService
      .loadTags()
      .then(tags => this.tags = tags);
  }

  resetTag(){
    this.tag = {};
  }

}

TagsController.$inject = ['tagService', '$location'];

export default TagsController;
