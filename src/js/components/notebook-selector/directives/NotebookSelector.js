import $ from "jquery";

class NotebookSelector {

  constructor(notebookService){
    this.notebookService = notebookService
    this.restrict = "E";
    this.require = "ngModel"
    this.templateUrl = "components/notebook-selector/index.html";
  }

  link(scope, elem, attrs, notebookIdModel){
    scope.showList = false;
    scope.notebooks = [];
    scope.notebookName = "Choose a book";

    scope.select = (notebook) => {
      notebookIdModel.$setViewValue(notebook._id);
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
