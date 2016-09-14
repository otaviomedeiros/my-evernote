import 'jquery';
import angular from 'angular';
import angularRouter from 'angular-route';
import angularMessages from 'angular-messages';

import notebooks from './notebooks/notebooks.main';
import notes from './notes/notes.main';
import tags from './tags/tags.main';
import users from './users/users.main';

import services from './common/services/services.main';
import controllers from './common/controllers/controllers.main';
import directives from './common/directives/directives.main';
import filters from './common/filters/filters.main';

import {config, run} from './config';

import '../css/style.less';


const moduleName = 'notesApp';

angular.module(moduleName, [angularRouter, angularMessages, services, controllers, directives,
  filters, notebooks, notes, tags, users])
  .config(config)
  .run(run);


export default moduleName;
