import FlashController from "../controllers/FlashController";

class FlashMessage {

  constructor(){
    this.restrict = "E";
    this.controller = FlashController;
    this.controllerAs = "flashController";

    this.template = `
      <div class="flash-messages-container" ng-show="flashController.show">
        <div class="flash-message success" ng-show="flashController.level === 'success'">
          <i class="glyphicon glyphicon-ok-sign"></i> {{ flashController.message }}
        </div>
        <div class="flash-message error" ng-show="flashController.level === 'error'">
          <i class="glyphicon glyphicon-remove-sign"></i> {{ flashController.message }}
        </div>
      </div>
    `;
  }

  static factory(){
    return new FlashMessage();
  }

}

export default FlashMessage.factory;
