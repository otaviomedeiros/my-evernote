import $ from "jquery";
import NotebookSelectorController from "../controllers/NotebookSelectorController";

class NotebookSelector {

  constructor($rootScope){
    this.$rootScope = $rootScope;
    this.restrict = "E";
    this.templateUrl = "components/notebook-selector/index.html";
    this.controller = NotebookSelectorController;
    this.controllerAs = "selectorCtrl";
  }

  link(scope, elem, attrs){
    $("body").on("click", (e) => {
      if (!$(".notebook-selector, .notebook-selector *").is(e.target)){
        elem.find(".notebooks-list").hide();
      }
    });

    elem.on("click", () => {
      elem.find(".notebooks-list").show();
      this.$rootScope.$emit("notebook:list");
    });
  }

  static factory($rootScope){
    return new NotebookSelector($rootScope);
  }

}

NotebookSelector.factory.$inject = ["$rootScope"];

export default NotebookSelector.factory;
