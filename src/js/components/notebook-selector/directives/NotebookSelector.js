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
      if (this.clickedOutsideComponent(elem, e)){
        elem.find(".notebooks-list").hide();
      }
    });

    elem.on("click", () => {
      elem.find(".notebooks-list").show();
      this.$rootScope.$emit("notebook:list");
    });
  }

  clickedOutsideComponent(elem, e){
    return !elem.is(e.target) && !elem.find('*').is(e.target)
  }

  static factory($rootScope){
    return new NotebookSelector($rootScope);
  }

}

NotebookSelector.factory.$inject = ["$rootScope"];

export default NotebookSelector.factory;
