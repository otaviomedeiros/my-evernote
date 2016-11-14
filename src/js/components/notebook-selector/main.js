import angular from "angular";
import notebookSelector from "./directives/NotebookSelector";

angular.module("notebookSelector", [])
  .directive("notebookSelector", notebookSelector);

export default "notebookSelector";
