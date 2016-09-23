import $ from "jquery";

class NotebookSelector {

  constructor(notebookService){
    this.notebookService = notebookService
    this.restrict = "E";
    this.require = "ngModel"
    this.templateUrl = "components/notebook-selector/index.html";
  }

  link(scope, elem, attrs, ngModel){
    scope.showList = false;
    scope.notebooks = [];
    scope.notebookName = "Choose a book";

    if (attrs.required) {
      let hiddenInput = elem.find("[data-notebook]");
      hiddenInput.attr("required", true);
      hiddenInput.attr("name", attrs.name);
    }

    ngModel.$render = () => {
      if (ngModel.$modelValue && ngModel.$modelValue.name){
        scope.notebookName = ngModel.$modelValue.name;
      }
    }

    scope.select = (notebook) => {
      ngModel.$setViewValue(notebook);
      scope.notebookName = notebook.name;
      scope.showList = false;
    };

    scope.loadNotebooks = () => {
      scope.showList = true;
      this.notebookService
        .loadNotebooks()
        .then(notebooks => scope.notebooks = notebooks);
    };

    const clickCheck = (e) => {
      if (this.clickedOutsideComponent(elem, e)) {
        scope.$apply(() => scope.showList = false);
      }
    };

    document.addEventListener("click", clickCheck);
    scope.$on("$locationChangeStart", () => document.removeEventListener("click", clickCheck));
  }

  clickedOutsideComponent(elem, e){
    return !elem.is(e.target) && !elem.find('*').is(e.target)
  }

  static factory(notebookService){
    return new NotebookSelector(notebookService);
  }

}

NotebookSelector.factory.$inject = ["notebookService"];

export default NotebookSelector.factory;
