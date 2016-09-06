class MenuItem {

  constructor(){
    this.restrict = 'A';
  }

  link(scope, elem, attrs){
    elem.find('a').on('click', () => {
      elem.siblings('[menu-item]').removeClass('active');
      elem.addClass('active');
    });
  }

  static directiveFactory(){
    return new MenuItem();
  }
}

exports default MenuItem.directiveFactory;
