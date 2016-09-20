import FlashController from "../controllers/FlashController";

class FlashMessage {

  constructor($rootScope){
    this.restrict = "E";
    this.controller = FlashController;
    this.controllerAs = "flashController";

    this.template = `
      <div class="flash-messages-container" ng-show="flashController.show">
        <div class="flash-message success" ng-show="flashController.type === 'success'">
          <i class="glyphicon glyphicon-ok-sign"></i> {{ flashController.message }}
        </div>
        <div class="flash-message error" ng-show="flashController.type === 'error'">
          <i class="glyphicon glyphicon-remove-sign"></i> {{ flashController.message }}
        </div>
      </div>
    `;
  }

  static factory($rootScope){
    return new FlashMessage($rootScope);
  }

}

FlashMessage.factory.$inject = ["$rootScope"];

export default FlashMessage.factory;
