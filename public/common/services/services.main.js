import authInterceptor from './AuthInterceptor';
import _ from './Underscore';

function config($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}

config.$inject = ['$httpProvider'];

const moduleName = 'services';

angular.module(moduleName, [])
  .service('authInterceptor', authInterceptor)
  .factory('_', _)
  .config(config);

exports default moduleName;
