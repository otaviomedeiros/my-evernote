/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _main = __webpack_require__(1);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.bootstrap(document, [_main2.default]);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _notebooks = __webpack_require__(2);

	var _notebooks2 = _interopRequireDefault(_notebooks);

	var _notes = __webpack_require__(6);

	var _notes2 = _interopRequireDefault(_notes);

	var _tags = __webpack_require__(11);

	var _tags2 = _interopRequireDefault(_tags);

	var _users = __webpack_require__(14);

	var _users2 = _interopRequireDefault(_users);

	var _services = __webpack_require__(19);

	var _services2 = _interopRequireDefault(_services);

	var _controllers = __webpack_require__(22);

	var _controllers2 = _interopRequireDefault(_controllers);

	var _directives = __webpack_require__(24);

	var _directives2 = _interopRequireDefault(_directives);

	var _filters = __webpack_require__(32);

	var _filters2 = _interopRequireDefault(_filters);

	__webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function config($routeProvider) {
	  $routeProvider.otherwise({ redirectTo: '/users/login' });
	}

	config.$inject = ['$routeProvider'];

	function run($rootScope, $location, AuthService) {
	  $rootScope.$on('$routeChangeStart', function () {
	    if ($location.path() !== '/users/login' && $location.path() !== '/users/register' && !AuthService.isLoggedIn()) {
	      $location.path('/users/login');
	    }
	  });
	}

	run.$inject = ['$rootScope', '$location', 'AuthService'];

	var moduleName = 'notesApp';

	angular.module(moduleName, ['ngRoute', 'ngMessages', 'textAngular', 'ngTagsInput', 'ngFlash', 'ui.gravatar', _services2.default, _controllers2.default, _directives2.default, _filters2.default, _notebooks2.default, _notes2.default, _tags2.default, _users2.default]).config(config).run(run);

	exports.default = moduleName;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _NotebooksController = __webpack_require__(3);

	var _NotebooksController2 = _interopRequireDefault(_NotebooksController);

	var _NewNotebookController = __webpack_require__(4);

	var _NewNotebookController2 = _interopRequireDefault(_NewNotebookController);

	var _EditNotebookController = __webpack_require__(5);

	var _EditNotebookController2 = _interopRequireDefault(_EditNotebookController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var moduleName = 'notebooks';

	function config($routeProvider) {
	  $routeProvider.when('/notebooks', {
	    templateUrl: 'pages/notebooks/index.html',
	    controller: 'NotebooksController',
	    controllerAs: 'notebooks'
	  }).when('/notebooks/new', {
	    templateUrl: 'pages/notebooks/new.html',
	    controller: 'NewNotebookController',
	    controllerAs: 'newNotebook'
	  }).when('/notebooks/:id', {
	    templateUrl: 'pages/notebooks/edit.html',
	    controller: 'EditNotebookController',
	    controllerAs: 'editNotebook'
	  });
	};

	config.$inject = ['$routeProvider'];

	angular.module(moduleName, []).config(config).controller('NotebooksController', _NotebooksController2.default).controller('NewNotebookController', _NewNotebookController2.default).controller('EditNotebookController', _EditNotebookController2.default);

	exports.default = moduleName;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotebooksController = function () {
	  function NotebooksController($http, Flash) {
	    _classCallCheck(this, NotebooksController);

	    this.notebooks = [];
	    this.$http = $http;
	    this.Flash = Flash;
	    this.loadNotebooks();
	  }

	  _createClass(NotebooksController, [{
	    key: 'delete',
	    value: function _delete(notebook) {
	      var _this = this;

	      this.$http.delete('/api/notebooks/' + notebook._id).success(function (result) {
	        _this.Flash.create('Success', "Notebook deleted", 3000, {}, false);
	        _this.loadNotebooks();
	      }).error(function (error) {
	        return _this.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }, {
	    key: 'loadNotebooks',
	    value: function loadNotebooks() {
	      var _this2 = this;

	      this.$http.get('/api/notebooks').then(function (result) {
	        return _this2.notebooks = result.data;
	      });
	    }
	  }]);

	  return NotebooksController;
	}();

	NotebooksController.$inject = ['$http', 'Flash'];

	exports.default = NotebooksController;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NewNoteboookController = function () {
	  function NewNoteboookController($http, $location, Flash) {
	    _classCallCheck(this, NewNoteboookController);

	    this.resetNotebook();
	    this.$http = $http;
	    this.$location = $location;
	    this.Flash = Flash;
	  }

	  _createClass(NewNoteboookController, [{
	    key: 'save',
	    value: function save() {
	      var _this = this;

	      this.$http.post('/api/notebooks', this.notebook).then(function (result) {
	        _this.resetNotebook();
	        _this.Flash.create('Success', 'Notebook created with success!', 3000, {}, false);
	        _this.$location.path('/notebooks');
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.resetNotebook();
	      this.$location.path('/notebooks');
	    }
	  }, {
	    key: 'resetNotebook',
	    value: function resetNotebook() {
	      this.notebook = {};
	    }
	  }]);

	  return NewNoteboookController;
	}();

	NewNoteboookController.$inject = ['$http', '$location', 'Flash'];

	exports.default = NewNoteboookController;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditNoteboookController = function () {
	  function EditNoteboookController($routeParams, $http, $location, Flash) {
	    _classCallCheck(this, EditNoteboookController);

	    this.$http = $http;
	    this.$location = $location;
	    this.Flash = Flash;
	    this.loadNotebook($routeParams.id);
	  }

	  _createClass(EditNoteboookController, [{
	    key: 'save',
	    value: function save() {
	      var _this = this;

	      this.$http.put('/api/notebooks/' + this.notebook._id, this.notebook).then(function (result) {
	        _this.Flash.create('Success', 'Notebook changed with success!', 3000, {}, false);
	        _this.$location.path('/notebooks');
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.$location.path('/notebooks');
	    }
	  }, {
	    key: 'loadNotebook',
	    value: function loadNotebook(notebookId) {
	      var _this2 = this;

	      this.$http.get('/api/notebooks/' + notebookId).then(function (result) {
	        return _this2.notebook = result.data;
	      });
	    }
	  }]);

	  return EditNoteboookController;
	}();

	EditNoteboookController.$inject = ['$routeParams', '$http', '$location', 'Flash'];

	exports.default = EditNoteboookController;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _NewNoteController = __webpack_require__(7);

	var _NewNoteController2 = _interopRequireDefault(_NewNoteController);

	var _EditNoteController = __webpack_require__(8);

	var _EditNoteController2 = _interopRequireDefault(_EditNoteController);

	var _NotesByNotebookController = __webpack_require__(9);

	var _NotesByNotebookController2 = _interopRequireDefault(_NotesByNotebookController);

	var _NotesByTagController = __webpack_require__(10);

	var _NotesByTagController2 = _interopRequireDefault(_NotesByTagController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var moduleName = 'notes';

	function config($routeProvider) {
	  $routeProvider.when('/notes/new', {
	    templateUrl: 'pages/notes/form.html',
	    controller: 'NewNoteController',
	    controllerAs: 'noteCtrl'
	  }).when('/notebooks/:id/notes', {
	    templateUrl: 'pages/notes/index.html',
	    controller: 'NotesByNotebookController',
	    controllerAs: 'notes'
	  }).when('/notes/:id', {
	    templateUrl: 'pages/notes/form.html',
	    controller: 'EditNoteController',
	    controllerAs: 'noteCtrl'
	  }).when('/tags/:id/notes', {
	    templateUrl: 'pages/notes/index.html',
	    controller: 'NotesByTagController',
	    controllerAs: 'notes'
	  });
	}

	config.$inject = ['$routeProvider'];

	angular.module(moduleName, []).controller('NewNoteController', _NewNoteController2.default).controller('EditNoteController', _EditNoteController2.default).controller('NotesByTagController', _NotesByTagController2.default).controller('NotesByNotebookController', _NotesByNotebookController2.default).config(config);

	exports.default = moduleName;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NewNoteController = function () {
	  function NewNoteController($http, $location, Flash) {
	    _classCallCheck(this, NewNoteController);

	    this.$http = $http;
	    this.$location = $location;
	    this.Flash = Flash;
	    this.resetNote();
	    this.loadNotebooks();
	  }

	  _createClass(NewNoteController, [{
	    key: 'save',
	    value: function save() {
	      var _this = this;

	      this.$http.post('/api/notes', this.note).success(function (result) {
	        return _this.Flash.create('Success', "Note saved", 3000, {}, false);
	      }).error(function (error) {
	        return _this.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.resetNote();
	      this.$location.path('/notebooks');
	    }
	  }, {
	    key: 'resetNote',
	    value: function resetNote() {
	      this.note = {};
	    }
	  }, {
	    key: 'loadNotebooks',
	    value: function loadNotebooks() {
	      var _this2 = this;

	      this.$http.get('/api/notebooks').then(function (result) {
	        return _this2.notebooks = result.data;
	      });
	    }
	  }, {
	    key: 'loadTags',
	    value: function loadTags(query) {
	      return this.$http.get('/api/tags').then(function (result) {
	        return result.data.map(function (item) {
	          return { text: item.name, tagId: item._id };
	        });
	      });
	    }
	  }]);

	  return NewNoteController;
	}();

	NewNoteController.$inject = ['$http', '$location', 'Flash'];

	exports.default = NewNoteController;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EditNoteController = function () {
	  function EditNoteController($http, $location, $routeParams, Flash) {
	    _classCallCheck(this, EditNoteController);

	    this.$http = $http;
	    this.$location = $location;
	    this.Flash = Flash;

	    this.loadNotebooks();
	    this.loadNote($routeParams.id);
	  }

	  _createClass(EditNoteController, [{
	    key: 'save',
	    value: function save() {
	      var _this = this;

	      this.$http.put('/api/notes/' + this.note._id, this.note).success(function (result) {
	        return _this.Flash.create('Success', "Note saved", 3000, {}, false);
	      }).error(function (error) {
	        return _this.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.$location.path('/notebooks');
	    }
	  }, {
	    key: 'loadNotebooks',
	    value: function loadNotebooks() {
	      var _this2 = this;

	      this.$http.get('/api/notebooks').then(function (result) {
	        return _this2.notebooks = result.data;
	      });
	    }
	  }, {
	    key: 'loadNote',
	    value: function loadNote(id) {
	      var _this3 = this;

	      this.$http.get('/api/notes/' + id).then(function (result) {
	        return _this3.note = result.data;
	      });
	    }
	  }, {
	    key: 'loadTags',
	    value: function loadTags(query) {
	      return this.$http.get('/api/tags').then(function (result) {
	        return result.data.map(function (item) {
	          return { text: item.name, tagId: item._id };
	        });
	      });
	    }
	  }]);

	  return EditNoteController;
	}();

	EditNoteController.$inject = ['$http', '$location', '$routeParams', 'Flash'];

	exports.default = EditNoteController;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotesByNotebookController = function () {
	  function NotesByNotebookController($http, $routeParams, Flash) {
	    _classCallCheck(this, NotesByNotebookController);

	    this.$http = $http;
	    this.Flash = Flash;
	    this.notebookId = $routeParams.id;
	    this.loadNotes();
	  }

	  _createClass(NotesByNotebookController, [{
	    key: 'loadNotes',
	    value: function loadNotes() {
	      var _this = this;

	      this.$http.get('/api/notebooks/' + this.notebookId + '/notes').then(function (result) {
	        return _this.notes = result.data;
	      });
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(note) {
	      var _this2 = this;

	      this.$http.delete('/api/notes/' + note._id).success(function (result) {
	        _this2.Flash.create('Success', "Note deleted", 3000, {}, false);
	        _this2.loadNotes();
	      }).error(function (error) {
	        return _this2.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }]);

	  return NotesByNotebookController;
	}();

	NotesByNotebookController.$inject = ['$http', '$routeParams', 'Flash'];

	exports.default = NotesByNotebookController;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotesByTagController = function () {
	  function NotesByTagController($http, $routeParams, Flash) {
	    _classCallCheck(this, NotesByTagController);

	    this.$http = $http;
	    this.Flash = Flash;
	    this.notebookId = $routeParams.id;
	    this.loadNotes();
	  }

	  _createClass(NotesByTagController, [{
	    key: 'delete',
	    value: function _delete(note) {
	      var _this = this;

	      this.$http.delete('/api/notes/' + note._id).success(function (result) {
	        _this.Flash.create('Success', "Note deleted", 3000, {}, false);
	        _this.loadNotes();
	      }).error(function (error) {
	        return _this.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }, {
	    key: 'loadNotes',
	    value: function loadNotes() {
	      var _this2 = this;

	      this.$http.get('/api/tags/' + this.notebookId + '/notes').then(function (result) {
	        return _this2.notes = result.data;
	      });
	    }
	  }]);

	  return NotesByTagController;
	}();

	;

	NotesByTagController.$inject = ['$http', '$routeParams', 'Flash'];

	exports.default = NotesByTagController;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _TagsController = __webpack_require__(12);

	var _TagsController2 = _interopRequireDefault(_TagsController);

	var _NewTagController = __webpack_require__(13);

	var _NewTagController2 = _interopRequireDefault(_NewTagController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function config($routeProvider) {
	  $routeProvider.when('/tags', {
	    templateUrl: 'pages/tags/index.html',
	    controller: 'TagsController',
	    controllerAs: 'tags'
	  }).when('/tags/new', {
	    templateUrl: 'pages/tags/form.html',
	    controller: 'NewTagController',
	    controllerAs: 'newTag'
	  });
	};

	config.$inject = ['$routeProvider'];

	var moduleName = 'tags';

	angular.module(moduleName, []).config(config).controller('TagsController', _TagsController2.default).controller('NewTagController', _NewTagController2.default);

	exports.default = moduleName;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TagsController = function () {
	  function TagsController($http, Flash) {
	    _classCallCheck(this, TagsController);

	    this.$http = $http;
	    this.Flash = Flash;

	    this.loadTags();
	  }

	  _createClass(TagsController, [{
	    key: 'delete',
	    value: function _delete(tag) {
	      var _this = this;

	      this.$http.delete('/api/tags/' + tag._id).success(function (result) {
	        _this.Flash.create('Success', "Tag deleted", 3000, {}, false);
	        _this.loadTags();
	      }).error(function (error) {
	        return _this.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }, {
	    key: 'loadTags',
	    value: function loadTags() {
	      var _this2 = this;

	      this.$http.get('/api/tags').then(function (result) {
	        return _this2.tags = result.data;
	      });
	    }
	  }]);

	  return TagsController;
	}();

	TagsController.$inject = ['$http', 'Flash'];

	exports.default = TagsController;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NewTagController = function () {
	  function NewTagController($http, $location, Flash) {
	    _classCallCheck(this, NewTagController);

	    this.$location = $location;
	    this.$http = $http;
	    this.Flash = Flash;
	  }

	  _createClass(NewTagController, [{
	    key: 'save',
	    value: function save() {
	      var _this = this;

	      this.$http.post('/api/tags', this.tag).then(function (result) {
	        _this.resetTag();
	        _this.Flash.create('Success', 'Tag created with success!', 3000, {}, false);
	        _this.$location.path('/tags');
	      });
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.resetTag();
	      this.$location.path('/tags');
	    }
	  }, {
	    key: 'resetTag',
	    value: function resetTag() {
	      this.tag = {};
	    }
	  }]);

	  return NewTagController;
	}();

	NewTagController.$inject = ['$http', '$location', 'Flash'];

	exports.default = NewTagController;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AuthController = __webpack_require__(15);

	var _AuthController2 = _interopRequireDefault(_AuthController);

	var _RegisterController = __webpack_require__(16);

	var _RegisterController2 = _interopRequireDefault(_RegisterController);

	var _UserController = __webpack_require__(17);

	var _UserController2 = _interopRequireDefault(_UserController);

	var _AuthService = __webpack_require__(18);

	var _AuthService2 = _interopRequireDefault(_AuthService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function config($routeProvider) {
	  $routeProvider.when('/users/login', {
	    templateUrl: 'pages/users/login.html',
	    controller: 'AuthController',
	    controllerAs: 'auth'
	  }).when('/users/register', {
	    templateUrl: 'pages/users/register.html',
	    controller: 'RegisterController',
	    controllerAs: 'vm'
	  }).when('/user/settings', {
	    templateUrl: 'pages/users/settings.html',
	    controller: 'UserController',
	    controllerAs: 'userCtrl'
	  });
	}

	config.$inject = ['$routeProvider'];

	var moduleName = 'users';

	angular.module(moduleName, []).controller('AuthController', _AuthController2.default).controller('RegisterController', _RegisterController2.default).controller('UserController', _UserController2.default).service('AuthService', _AuthService2.default).config(config);

	exports.default = moduleName;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AuthController = function () {
	  function AuthController($location, AuthService, Flash) {
	    _classCallCheck(this, AuthController);

	    if (AuthService.isLoggedIn()) {
	      $location.path('/notebooks');
	    }

	    this.Flash = Flash;
	    this.AuthService = AuthService;
	    this.$location = $location;
	    this.user = { email: '', password: '' };
	  }

	  _createClass(AuthController, [{
	    key: 'login',
	    value: function login() {
	      var _this = this;

	      this.Flash.clear();

	      this.AuthService.login(this.user).error(function (err) {
	        return _this.Flash.create('danger', err.message, 0, {}, false);
	      }).success(function () {
	        return _this.$location.path('/notebooks');
	      });
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.AuthService.logout();
	      this.$location.path('/users/login');
	    }
	  }]);

	  return AuthController;
	}();

	AuthController.$inject = ['$location', 'AuthService', 'Flash'];

	exports.default = AuthController;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterController = function () {
	  function RegisterController($location, AuthService) {
	    _classCallCheck(this, RegisterController);

	    this.AuthService = AuthService;
	    this.$location = $location;
	    this.serverErrors = [];
	    this.user = { name: '', email: '', password: '' };
	  }

	  _createClass(RegisterController, [{
	    key: 'register',
	    value: function register() {
	      var _this = this;

	      this.AuthService.register(this.user).error(function (err) {
	        return console.log(err);
	      }).then(function () {
	        return _this.$location.path('/notebooks');
	      });
	    }
	  }]);

	  return RegisterController;
	}();

	RegisterController.$inject = ['$location', 'AuthService'];

	exports.default = RegisterController;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserController = function () {
	  function UserController($location, $http, AuthService, Flash) {
	    _classCallCheck(this, UserController);

	    this.$location = $location;
	    this.$http = $http;
	    this.AuthService = AuthService;
	    this.Flash = Flash;

	    this.loadUser();
	  }

	  _createClass(UserController, [{
	    key: 'cancel',
	    value: function cancel() {
	      this.$location.path('/');
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      var _this = this;

	      this.$http.put('/api/users/' + this.user._id, this.user).success(function (result) {
	        _this.$location.path('/');
	        _this.Flash.create('Success', 'Profile updated with success!', 3000, {}, false);
	      }).error(function (error) {
	        return _this.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }, {
	    key: 'loadUser',
	    value: function loadUser() {
	      var _this2 = this;

	      this.$http.get('/api/users/' + this.AuthService.currentUser().id).success(function (result) {
	        return _this2.user = result;
	      }).error(function (error) {
	        return _this2.Flash.create('danger', error, 0, {}, false);
	      });
	    }
	  }]);

	  return UserController;
	}();

	UserController.$inject = ['$location', '$http', 'AuthService', 'Flash'];

	exports.default = UserController;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AuthService = function () {
	  function AuthService($http, $window) {
	    _classCallCheck(this, AuthService);

	    this.$window = $window;
	    this.$http = $http;
	  }

	  _createClass(AuthService, [{
	    key: 'saveToken',
	    value: function saveToken(token) {
	      this.$window.localStorage['note-app-token'] = token;
	    }
	  }, {
	    key: 'getToken',
	    value: function getToken() {
	      return this.$window.localStorage['note-app-token'];
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.$window.localStorage.removeItem('note-app-token');
	    }
	  }, {
	    key: 'isLoggedIn',
	    value: function isLoggedIn() {
	      var token = this.getToken();

	      if (token) {
	        var payload = token.split('.')[1];
	        payload = this.$window.atob(payload);
	        payload = JSON.parse(payload);

	        return payload.exp > Date.now() / 1000;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'currentUser',
	    value: function currentUser() {
	      if (this.isLoggedIn()) {
	        var token = this.getToken();
	        var payload = token.split('.')[1];
	        payload = this.$window.atob(payload);
	        payload = JSON.parse(payload);

	        return { id: payload._id, email: payload.email, name: payload.name };
	      }
	    }
	  }, {
	    key: 'register',
	    value: function register(user) {
	      var _this = this;

	      return this.$http.post('/auth/register', user).success(function (result) {
	        return _this.saveToken(result.token);
	      });
	    }
	  }, {
	    key: 'login',
	    value: function login(user) {
	      var _this2 = this;

	      return this.$http.post('/auth/login', user).success(function (result) {
	        return _this2.saveToken(result.token);
	      });
	    }
	  }], [{
	    key: 'authServiceFactory',
	    value: function authServiceFactory($http, $window) {
	      return new AuthService($http, $window);
	    }
	  }]);

	  return AuthService;
	}();

	AuthService.authServiceFactory.$inject = ['$http', '$window'];

	exports.default = AuthService.authServiceFactory;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AuthInterceptor = __webpack_require__(20);

	var _AuthInterceptor2 = _interopRequireDefault(_AuthInterceptor);

	var _Underscore = __webpack_require__(21);

	var _Underscore2 = _interopRequireDefault(_Underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function config($httpProvider) {
	  $httpProvider.interceptors.push('authInterceptor');
	}

	config.$inject = ['$httpProvider'];

	var moduleName = 'services';

	angular.module(moduleName, []).service('authInterceptor', _AuthInterceptor2.default).factory('_', _Underscore2.default).config(config);

	exports.default = moduleName;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AuthInterceptor = function () {
	  function AuthInterceptor($window) {
	    _classCallCheck(this, AuthInterceptor);

	    this.$window = $window;
	  }

	  _createClass(AuthInterceptor, [{
	    key: 'request',
	    value: function request(config) {
	      //config.headers['Authorization'] = `Bearer ${this.$window.localStorage['note-app-token']}`;
	      config.headers['Authorization'] = 'Bearer ' + window.localStorage['note-app-token'];
	      return config;
	    }
	  }], [{
	    key: 'serviceFactory',
	    value: function serviceFactory($window) {
	      return new AuthInterceptor($window);
	    }
	  }]);

	  return AuthInterceptor;
	}();

	AuthInterceptor.serviceFactory.$inject = ['$window'];

	exports.default = AuthInterceptor.serviceFactory;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function underscore($window) {
	  return $window._;
	}

	underscore.$inject = ['$window'];

	exports.default = underscore;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _NavigationController = __webpack_require__(23);

	var _NavigationController2 = _interopRequireDefault(_NavigationController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var moduleName = 'controllers';
	angular.module(moduleName, []).controller('navigationController', _NavigationController2.default);

	exports.default = moduleName;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavigationController = function () {
	  function NavigationController(AuthService) {
	    _classCallCheck(this, NavigationController);

	    this.AuthService = AuthService;
	  }

	  _createClass(NavigationController, [{
	    key: 'isLoggedIn',
	    value: function isLoggedIn() {
	      return this.AuthService.isLoggedIn();
	    }
	  }, {
	    key: 'user',
	    value: function user() {
	      return this.AuthService.currentUser();
	    }
	  }]);

	  return NavigationController;
	}();

	NavigationController.$inject = ['AuthService'];

	exports.default = NavigationController;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _EmailAlreadyInUse = __webpack_require__(25);

	var _EmailAlreadyInUse2 = _interopRequireDefault(_EmailAlreadyInUse);

	var _UniqueNotebook = __webpack_require__(26);

	var _UniqueNotebook2 = _interopRequireDefault(_UniqueNotebook);

	var _UniqueTag = __webpack_require__(27);

	var _UniqueTag2 = _interopRequireDefault(_UniqueTag);

	var _Confirm = __webpack_require__(28);

	var _Confirm2 = _interopRequireDefault(_Confirm);

	var _MenuItem = __webpack_require__(29);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	var _ShowActionsHover = __webpack_require__(30);

	var _ShowActionsHover2 = _interopRequireDefault(_ShowActionsHover);

	var _HideMenu = __webpack_require__(31);

	var _HideMenu2 = _interopRequireDefault(_HideMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var moduleName = 'directives';

	angular.module(moduleName, []).directive('emailAlreadyInUse', _EmailAlreadyInUse2.default).directive('uniqueNotebook', _UniqueNotebook2.default).directive('uniqueTag', _UniqueTag2.default).directive('confirm', _Confirm2.default).directive('menuItem', _MenuItem2.default).directive('showActionsHover', _ShowActionsHover2.default).directive('hideMenu', _HideMenu2.default);

	exports.default = moduleName;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EmailAlreadyInUse = function () {
	  function EmailAlreadyInUse($http, $q) {
	    _classCallCheck(this, EmailAlreadyInUse);

	    this.require = 'ngModel';
	    this.restrict = 'A';

	    this.$http = $http;
	    this.$q = $q;
	  }

	  _createClass(EmailAlreadyInUse, [{
	    key: 'link',
	    value: function link(scope, element, attrs, emailNgModel) {
	      var _this = this;

	      emailNgModel.$asyncValidators.alreadyinuse = function (modelValue, viewValue) {
	        return _this.$q(function (resolve, reject) {
	          _this.$http.get('/auth/email/' + viewValue).success(function () {
	            return reject();
	          }).error(function () {
	            return resolve();
	          });
	        });
	      };
	    }
	  }], [{
	    key: 'directiveFactory',
	    value: function directiveFactory($http, $q) {
	      return new EmailAlreadyInUse($http, $q);
	    }
	  }]);

	  return EmailAlreadyInUse;
	}();

	EmailAlreadyInUse.directiveFactory.$inject = ['$http', '$q'];

	exports.default = EmailAlreadyInUse.directiveFactory;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UniqueNotebook = function () {
	  function UniqueNotebook($http, $q) {
	    _classCallCheck(this, UniqueNotebook);

	    this.require = 'ngModel';
	    this.restrict = 'A';

	    this.$http = $http;
	    this.$q = $q;
	  }

	  _createClass(UniqueNotebook, [{
	    key: 'link',
	    value: function link(scope, elem, attrs, nameNgModel) {
	      var _this = this;

	      nameNgModel.$asyncValidators.unique = function (modelValue, viewValue) {
	        return _this.$q(function (resolve, reject) {
	          _this.$http.get('/api/notebooks', { params: { name: viewValue } }).success(function (notes) {
	            return notes.length > 0 ? reject() : resolve();
	          }).error(function () {
	            return reject();
	          });
	        });
	      };
	    }
	  }], [{
	    key: 'directiveFactory',
	    value: function directiveFactory($http, $q) {
	      return new UniqueNotebook($http, $q);
	    }
	  }]);

	  return UniqueNotebook;
	}();

	UniqueNotebook.directiveFactory.$inject = ['$http', '$q'];

	exports.default = UniqueNotebook.directiveFactory;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UniqueTag = function () {
	  function UniqueTag($http, $q) {
	    _classCallCheck(this, UniqueTag);

	    this.require = 'ngModel';
	    this.restrict = 'A';

	    this.$http = $http;
	    this.$q = $q;
	  }

	  _createClass(UniqueTag, [{
	    key: 'link',
	    value: function link(scope, element, attrs, tagNameNgModel) {
	      var _this = this;

	      tagNameNgModel.$asyncValidators.unique = function (modelValue, viewValue) {
	        return _this.$q(function (resolve, reject) {
	          _this.$http.get('/api/tags', { params: { name: viewValue } }).success(function (tags) {
	            return tags.length > 0 ? reject() : resolve();
	          }).error(function () {
	            return reject();
	          });
	        });
	      };
	    }
	  }], [{
	    key: 'directiveFactory',
	    value: function directiveFactory($http, $q) {
	      return new UniqueTag($http, $q);
	    }
	  }]);

	  return UniqueTag;
	}();

	UniqueTag.directiveFactory.$inject = ['$http', '$q'];

	exports.default = UniqueTag.directiveFactory;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Confirm = function () {
	  function Confirm() {
	    _classCallCheck(this, Confirm);

	    this.restrict = 'A';

	    this.link = {
	      pre: function pre(scope, element, attrs) {
	        element.bind('click', function (e) {
	          if (!confirm(attrs.confirm)) {
	            e.stopImmediatePropagation();
	            e.preventDefault();
	          }
	        });
	      }
	    };
	  }

	  _createClass(Confirm, null, [{
	    key: 'directiveFactory',
	    value: function directiveFactory() {
	      return new Confirm();
	    }
	  }]);

	  return Confirm;
	}();

	exports.default = Confirm.directiveFactory;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MenuItem = function () {
	  function MenuItem() {
	    _classCallCheck(this, MenuItem);

	    this.restrict = 'A';
	  }

	  _createClass(MenuItem, [{
	    key: 'link',
	    value: function link(scope, elem, attrs) {
	      elem.find('a').on('click', function () {
	        elem.siblings('[menu-item]').removeClass('active');
	        elem.addClass('active');
	      });
	    }
	  }], [{
	    key: 'directiveFactory',
	    value: function directiveFactory() {
	      return new MenuItem();
	    }
	  }]);

	  return MenuItem;
	}();

	exports.default = MenuItem.directiveFactory;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ShowActionsHover = function () {
	  function ShowActionsHover() {
	    _classCallCheck(this, ShowActionsHover);

	    this.restrict = 'A';
	  }

	  _createClass(ShowActionsHover, [{
	    key: 'link',
	    value: function link(scope, elem, attrs) {
	      elem.on('mouseenter', function () {
	        elem.find('[actions-hover]').show();
	      });

	      elem.on('mouseleave', function () {
	        elem.find('[actions-hover]').hide();
	      });
	    }
	  }], [{
	    key: 'directiveFactory',
	    value: function directiveFactory() {
	      return new ShowActionsHover();
	    }
	  }]);

	  return ShowActionsHover;
	}();

	exports.default = ShowActionsHover.directiveFactory;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HideMenu = function () {
	  function HideMenu() {
	    _classCallCheck(this, HideMenu);

	    this.restrict = 'A';
	  }

	  _createClass(HideMenu, [{
	    key: 'link',
	    value: function link(scope, elem, attrs) {
	      $('nav').hide();
	      scope.$on('$destroy', function () {
	        return $('nav').show();
	      });
	    }
	  }], [{
	    key: 'directiveFactory',
	    value: function directiveFactory() {
	      return new HideMenu();
	    }
	  }]);

	  return HideMenu;
	}();

	exports.default = HideMenu.directiveFactory;

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var htmlToPlaintext = function htmlToPlaintext() {
	  return function (text) {
	    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	  };
	};

	var noteContent = function noteContent() {
	  return function (content) {
	    return content ? content.substr(0, 580) : '';
	  };
	};

	var moduleName = 'filters';
	angular.module(moduleName, []).filter('htmlToPlaintext', htmlToPlaintext).filter('notecontent', noteContent);

	exports.default = moduleName;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(34);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(36)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "body {\n  -webkit-font-smoothing: antialiased;\n  font-family: gotham, helvetica, arial, sans-serif;\n}\n.main-container {\n  padding-left: 0;\n}\n\n.main-container .app-content h1 {\n  font-size: 21px;\n  font-weight: 300;\n  letter-spacing: 0.5px;\n}\n\n.main-container .app-content .btn {\n  margin-top: 20px;\n}\n\n.main-container .app-content .form-container {\n  display: table;\n  width: 100%;\n  height: 100%;\n}\n\n.main-container .app-content .form-container .container-row {\n  display: table-row;\n}\n\n.main-container .app-content .form-container .container-cell {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.main-container .list {\n  margin-top: 40px;\n}\n\n.main-container .list .list-item {\n  padding-top: 10px;\n  border-top: 2px solid #f1f1f1;\n}\n\n.main-container .list .list-item-note {\n  height: 130px;\n}\n\n.main-container .list .list-item .list-item-action-bar {\n  display: none;\n}\n\n\n.main-container .list .list-item:hover .list-item-title a {\n  color: black;\n}\n\n\n.main-container .list .list-item:hover .list-item-addons {\n  border: none;\n  color: #4a4a4a;\n}\n\n.main-container .list .list-item .list-item-addons {\n  color: #878787;\n  font-family: gotham, helvetica, arial, sans-serif;\n  font-size: 11px;\n  font-weight: 500;\n  padding-top: 5px;\n  padding-bottom: 10px;\n}\n.main-container .list .list-item-note .list-item-addons {\n  height: 80px !important;\n}\n\n.main-container .list .list-item .list-item-title a {\n  text-decoration: none;\n  color: #4a4a4a;\n  font-family: caecilia, times, serif;\n  font-size: 16px;\n  font-weight: 400;\n}\n\n.main-container .list .list-item-note .list-item-title {\n  height: 40px !important;\n}\n\n\n.note-form .note-form-header {\n  padding-bottom: 10px;\n}\n\n.note-form .note-form-header .note-options {\n  margin-top:20px;\n  margin-right: 10px;\n}\n\n.note-form .note-options.tags {\n  height: 35px;\n  width: 300px;\n}\n\n\n.main-menu ul.primary li a {\n  padding-top: 30px;\n  padding-bottom: 6px;\n  padding-left: 0px;\n  padding-right: 0px;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n\n.main-menu.navbar {\n    background-color: #fff !important;\n    border: none !important;\n}\n\n.main-menu ul.primary li.active a {\n  color: #0069ff !important;\n  background: none !important;\n}\n\n.main-menu ul.primary li a:hover {\n  border-bottom: 2px solid #0069ff;\n  color: #0069ff;\n  cursor: pointer;\n}\n\n.main-menu ul.secondary {\n  padding-top: 20px;\n}\n.main-menu ul.secondary li.menu-item {\n  margin-right: 20px;\n}\n\n.main-menu .navbar-nav li a {\n  padding: 10px 25px;\n}\n\n.btn.btn-success {\n  color: white !important;\n  background: #15CD72;\n  border: 1px solid #15CD72;\n  font-weight: 600;\n}\n\n.btn.btn-success:hover {\n  background: #0CB863 !important;\n  border: 1px solid #0CB863 !important;\n}\n\n.btn.btn-primary {\n  color: white !important;\n  background: #0069ff;\n  border: 1px solid #0069ff;\n  font-weight: 500;\n}\n\n\n.form-input {\n  padding: 50px 50px 0px 50px;\n}\n\n.form-input label {\n  color: #ccc;\n}\n\n.form-input input {\n  padding: 10px 10px !important;\n  font-size: 18px !important;\n  font-weight: normal !important;\n  height: auto !important;\n}\n\n.note-form {\n  font-weight: normal !important;\n}\n\ntags-input .host {\n  margin: 0 !important;\n}\n\ntags-input .tags {\n  box-shadow: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n}\n\ntags-input .tags .tag-item {\n  border: 1px solid #ccc !important;\n  background: #e6e6e6 !important;\n  color: #585858 !important;\n}\n\ntags-input .autocomplete .suggestion-item.selected, tags-input .autocomplete .suggestion-item.selected em {\n  color: #585858;\n  background-color: #e6e6e6;\n}\n\ndiv[text-angular-toolbar] .btn {\n  font-size: 10px;\n  height: 25px;\n}\n\ndiv[text-angular-toolbar] .btn-group {\n  margin-bottom: 10px;\n}\n\n.ta-scroll-window.ta-text.ta-editor.form-control {\n  border: none !important;\n  border-radius: 0 !important;\n  border-top: 1px solid #ccc !important;\n}\n\n.user-profile-menu .information {\n  font-size: 10px;\n  padding: 5px 15px;\n}\n\n.auth-container {\n  width: 400px !important;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.auth-container .form-input {\n  padding-top: 5px;\n}\n\n.auth-container .form-input input[type=submit] {\n  margin-top: 0px !important;\n}\n", ""]);

	// exports


/***/ },
/* 35 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);