import EmailAlreadyInUse from './EmailAlreadyInUse';
import UniqueNotebook from './UniqueNotebook';
import UniqueTag from './UniqueTag';
import Confirm from './Confirm';
import MenuItem from './MenuItem';
import ShowActionsHover from './ShowActionsHover';
import HideMenu from './HideMenu';

const moduleName = 'directives';

angular.module(moduleName, [])
  .directive('emailAlreadyInUse', EmailAlreadyInUse)
  .directive('uniqueNotebook', UniqueNotebook)
  .directive('uniqueTag', UniqueTag)
  .directive('confirm', Confirm)
  .directive('menuItem', MenuItem)
  .directive('showActionsHover', ShowActionsHover)
  .directive('hideMenu', HideMenu);

export default moduleName;
