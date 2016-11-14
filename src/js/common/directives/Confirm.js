class Confirm {

  constructor(){
    this.restrict = 'A';

    this.link = {
      pre(scope, element, attrs){
        element.bind('click', (e) => {
          if (!confirm(attrs.confirm)) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    };
  }

  static directiveFactory(){
    return new Confirm();
  }
}

export default Confirm.directiveFactory;
