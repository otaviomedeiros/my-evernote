class Confirm {

  constructor(){
    this.restrict = 'A';
  }

  link(scope, element, attrs){
    element.bind('click', () => {
      if (!confirm(attrs.confirm)) {
        event.stopImmediatePropagation();
        event.preventDefault;
      }
    });
  }

  static directiveFactory(){
    return new Confirm();
  }
}

  exports default Confirm.directiveFactory;
