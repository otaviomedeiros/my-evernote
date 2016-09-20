class EmailAlreadyInUse {

  constructor($http, $q){
    this.require = 'ngModel';
    this.restrict = 'A';

    this.$http = $http;
    this.$q = $q;
  }

  link(scope, element, attrs, emailNgModel){
    emailNgModel.$asyncValidators.alreadyinuse = (modelValue, viewValue) => {
      return this.$q((resolve, reject) => {
        this.$http.get(`/auth/email/${viewValue}`)
          .success(() => reject())
          .error(() => resolve())
      });
    }
  }

  static directiveFactory($http, $q){
    return new EmailAlreadyInUse($http, $q);
  }

}

EmailAlreadyInUse.directiveFactory.$inject = ['$http', '$q'];

export default EmailAlreadyInUse.directiveFactory;
