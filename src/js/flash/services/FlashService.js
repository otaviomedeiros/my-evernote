class FlashService {

  constructor($rootScope){
    this.$rootScope = $rootScope;
  }

  success(message){
    this.$rootScope.$emit("flash:message", message, 'success');
  }

  error(message){
    this.$rootScope.$emit("flash:message", message, 'error');
  }

  static factory($rootScope){
    return new FlashService($rootScope);
  }

}

FlashService.factory.$inject = ["$rootScope"];

export default FlashService.factory;
