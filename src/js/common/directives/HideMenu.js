class HideMenu {

  constructor(){
    this.restrict = 'A';
  }

  link(scope, elem, attrs){
    $('nav').hide();
    scope.$on('$destroy', () => $('nav').show());
  }

  static directiveFactory(){
    return new HideMenu();
  }
}

export default HideMenu.directiveFactory;
