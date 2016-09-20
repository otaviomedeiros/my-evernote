import angular from 'angular';
import NotesController from "./controllers/NotesController";
import NotesByNotebookController from './controllers/NotesByNotebookController';
import NotesByTagController from './controllers/NotesByTagController';
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
      templateUrl: 'pages/notes/index.html',
      controller: 'NotesByNotebookController',
      controllerAs: 'notes'
    }).
    when('/notes/:id', {
      templateUrl: 'pages/notes/edit.html',
      controller: 'NotesController',
      controllerAs: 'notes'
    }).
    when('/tags/:id/notes', {
      templateUrl: 'pages/notes/index.html',
      controller: 'NotesByTagController',
      controllerAs: 'notes'
    });
}

config.$inject = ['$routeProvider'];

angular.module(moduleName, [])
  .controller("NotesController", NotesController)
  .controller('NotesByTagController', NotesByTagController)
  .controller('NotesByNotebookController', NotesByNotebookController)
  .service("noteService", noteService)
  .config(config);

export default moduleName;
