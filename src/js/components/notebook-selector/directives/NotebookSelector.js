import $ from "jquery";
console.log();
class NotebookSelector {

  constructor(){
    this.restrict = "E";
    this.templateUrl = "components/notebook-selector/index.html";
  }

  link(scope, elem, attrs){
    $("body").on("click", (e) => {
      if (!$(".notebook-selector, .notebook-selector *").is(e.target)){
        elem.find(".notebooks-list").hide();
      }
    });

    elem.on("click", () => {
      elem.find(".notebooks-list").show();
    });
  }

  static factory(){
    return new NotebookSelector();
  }

}

export default NotebookSelector.factory;
