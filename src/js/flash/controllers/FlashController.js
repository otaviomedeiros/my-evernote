class FlashController {

  constructor($rootScope, $timeout){
    this.reset();

    $rootScope.$on("flash:message", (event, message, messageType) => {
      this.message = message;
      this.show = true;
      this.type = messageType;
      $timeout(() => this.reset(), 3000);
    });
  }

  reset(){
    this.message = "";
    this.show = false;
    this.type = "";
  }

}

FlashController.$inject = ["$rootScope", "$timeout"];

export default FlashController;
