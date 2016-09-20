import angular from 'angular';
import FlashMessage from './directives/FlashMessage';
import flashService from './services/FlashService';

angular.module('flashMessages', [])
  .directive('flashMessage', FlashMessage)
  .service('flash', flashService);

export default 'flashMessages';
