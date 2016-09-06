class HideMenu {

  constructor(){
    this.restrict = 'A';
  }

  link: function(scope, elem, attrs){
    $('nav').hide();
    scope.$on('$destroy', () => {
      $('nav').show();
    });
  }

  static directiveFactory(){
    return new HideMenu();
  }
}

exports default HideMenu.directiveFactory;
