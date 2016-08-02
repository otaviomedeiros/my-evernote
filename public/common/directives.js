notesApp.directive('emailAlreadyInUse', ['$q', '$http', function($q, $http){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, emailNgModel){
      emailNgModel.$asyncValidators.alreadyinuse = function(modelValue, viewValue){
        return $q(function(resolve, reject){
          $http.get('/auth/email/' + viewValue).success(function(){
            reject();
          }).error(function(){
            resolve();
          })
        });
      };
    }
  };
}]);

notesApp.directive('uniqueNotebook', ['$q', '$http', function($q, $http){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, nameNgModel){
      nameNgModel.$asyncValidators.unique = function(modelValue, viewValue){
        return $q(function(resolve, reject){
          $http.get('/api/notebooks', { params: { name: viewValue } })
            .success(function(notes){
              if (notes.length > 0) {
                reject();
              } else {
                resolve();
              }
            })
            .error(function(){
              reject();
            })
        });
      }
    }
  }
}]);

notesApp.directive('uniqueTag', ['$q', '$http', function($q, $http){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, tagNameNgModel){
      tagNameNgModel.$asyncValidators.unique = function(modelValue, viewValue){
        return $q(function(resolve, reject){
          $http.get('/api/tags', { params: { name: viewValue } })
            .success(function(tags){
              if (tags.length > 0) {
                reject();
              } else {
                resolve();
              }
            })
            .error(function(){
              reject();
            });
        });
      }
    }
  }
}]);


notesApp.directive('confirm', function(){
  return {
    restrict: 'A',
    link: {
      pre: function(scope, element, attrs){
        element.bind('click', function(){
          if (!confirm(attrs.confirm)) {
            event.stopImmediatePropagation();
            event.preventDefault;
          }
        });
      }
    }
  }
});


notesApp.directive('menuItem', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      elem.find('a').on('click', function(){
        elem.siblings('[menu-item]').removeClass('active');
        elem.addClass('active');
      });
    }
  }
}]);


notesApp.directive('showActionsHover', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      elem.on('mouseenter', function(){
        elem.find('[actions-hover]').show();
      });

      elem.on('mouseleave', function(){
        elem.find('[actions-hover]').hide();
      });
    }
  }
}]);


notesApp.directive('hideMenu', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      $('nav').hide();
      scope.$on('$destroy', function(){
        $('nav').show();
      });
    }
  }
}]);
