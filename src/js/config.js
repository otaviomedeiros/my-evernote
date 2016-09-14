export function config($routeProvider){
  $routeProvider.otherwise({ redirectTo: '/users/login' });
}

config.$inject = ['$routeProvider'];

export function run($rootScope, $location, AuthService){
  $rootScope.$on('$routeChangeStart', function(){
    if ($location.path() !== '/users/login' && $location.path() !== '/users/register' && !AuthService.isLoggedIn()){
      $location.path('/users/login');
    }
  });
}

run.$inject = ['$rootScope', '$location', 'AuthService'];
