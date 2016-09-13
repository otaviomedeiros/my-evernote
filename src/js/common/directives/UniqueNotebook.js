class UniqueNotebook {

  constructor($http, $q){
    this.require = 'ngModel';
    this.restrict = 'A';

    this.$http = $http;
    this.$q = $q;
  }

  link(scope, elem, attrs, nameNgModel){
    nameNgModel.$asyncValidators.unique = (modelValue, viewValue) => {
      return this.$q((resolve, reject) => {
        this.$http.get('/api/notebooks', { params: { name: viewValue } })
          .success(notes => notes.length > 0 ? reject() : resolve())
          .error(() => reject())
      });
    }
  }

  static directiveFactory($http, $q){
    return new UniqueNotebook($http, $q);
  }
}

UniqueNotebook.directiveFactory.$inject = ['$http', '$q'];

export default UniqueNotebook.directiveFactory;
