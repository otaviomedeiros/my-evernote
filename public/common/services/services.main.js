import authInterceptor from './AuthInterceptor';
import _ from './Underscore';

const moduleName = 'services';

angular.module(moduleName, [])
  .service('authInterceptor', authInterceptor)
  .factory('_', _);

exports default moduleName;
