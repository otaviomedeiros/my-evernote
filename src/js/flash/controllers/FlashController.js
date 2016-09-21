class FlashController {

  constructor($rootScope, $timeout){
    this.reset();

    $rootScope.$on("flash:message", (event, message, level) => {
      this.message = message;
      this.show = true;
      this.level = level;
      $timeout(() => this.reset(), 3000);
    });
  }

  reset(){
    this.message = "";
    this.show = false;
    this.level = "";
  }

}

FlashController.$inject = ["$rootScope", "$timeout"];

export default FlashController;
