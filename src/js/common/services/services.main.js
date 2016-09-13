import authInterceptor from './AuthInterceptor';
import underscore from './Underscore';

function config($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
}

config.$inject = ['$httpProvider'];

const moduleName = 'services';

angular.module(moduleName, [])
  .service('authInterceptor', authInterceptor)
  .factory('_', underscore)
  .config(config);

export default moduleName;
