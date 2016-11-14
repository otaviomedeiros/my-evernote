import angular from 'angular';
import Confirm from './Confirm';
import MenuItem from './MenuItem';
import ShowActionsHover from './ShowActionsHover';
import HideMenu from './HideMenu';

const moduleName = 'directives';

angular.module(moduleName, [])
  .directive('confirm', Confirm)
  .directive('menuItem', MenuItem)
  .directive('showActionsHover', ShowActionsHover)
  .directive('hideMenu', HideMenu);

export default moduleName;
