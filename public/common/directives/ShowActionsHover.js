class ShowActionsHover {

  constructor(){
    this.restrict = 'A';
  }

  link(scope, elem, attrs){
    elem.on('mouseenter', () => {
      elem.find('[actions-hover]').show();
    });

    elem.on('mouseleave', () => {
      elem.find('[actions-hover]').hide();
    });
  }

  static directiveFactory(){
    return new ShowActionsHover();
  }
}

exports default ShowActionsHover.directiveFactory;
