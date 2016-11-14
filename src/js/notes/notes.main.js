import angular from 'angular';
import NotesController from "./controllers/NotesController";
import noteService from "./services/NoteService";

const moduleName = 'notes';

function config($routeProvider){
  $routeProvider.
    when('/notes/new', {
      templateUrl: 'pages/notes/new.html',
      controller: 'NotesController',
      controllerAs: 'notes'
    }).
    when('/notebooks/:id/notes', {
      templateUrl: 'pages/notes/index-by-notebook.html',
      controller: 'NotesController',
      controllerAs: 'notes'
    }).
    when('/notes/:id', {
      templateUrl: 'pages/notes/edit.html',
      controller: 'NotesController',
      controllerAs: 'notes'
    }).
    when('/tags/:id/notes', {
      templateUrl: 'pages/notes/index-by-tag.html',
      controller: 'NotesController',
      controllerAs: 'notes'
    });
}

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .controller("NotesController", NotesController)
  .service("noteService", noteService)
  .config(config);

export default moduleName;
