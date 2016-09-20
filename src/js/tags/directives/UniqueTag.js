class UniqueTag {

  constructor($http, $q){
    this.require = 'ngModel';
    this.restrict = 'A';

    this.$http = $http;
    this.$q = $q;
  }

  link(scope, element, attrs, tagNameNgModel){
    tagNameNgModel.$asyncValidators.unique = (modelValue, viewValue) => {
      return this.$q((resolve, reject) => {
        this.$http.get('/api/tags', { params: { name: viewValue } })
          .success(tags => tags.length > 0 ? reject() : resolve())
          .error(() => reject());
      });
    }
  }

  static directiveFactory($http, $q){
    return new UniqueTag($http, $q);
  }
}

UniqueTag.directiveFactory.$inject = ['$http', '$q'];

export default UniqueTag.directiveFactory;
