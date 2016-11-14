class TagsController {

  constructor(tagService, $location, flash){
    this.tagService = tagService;
    this.$location = $location;
    this.flash = flash;
  }

  save(){
    this.tagService
      .save(this.tag)
      .then(() => {
        this.resetTag();
        this.$location.path('/tags');
        this.flash.success("Tag saved with success");
      });
  }

  delete(tag){
    this.tagService
      .delete(tag)
      .success(() => {
        this.loadTags();
        this.flash.success("Tag deleted with success");
      })
      .error(error => this.flash.error(error));
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

TagsController.$inject = ['tagService', '$location', 'flash'];

export default TagsController;
