describe('Directive - displayErrors', function() {

  beforeEach(inject(function($rootScope, _$compile_) {
    this.compile = _$compile_;
    this.scope = $rootScope.$new();
    this.scope.errors = ['err1', 'err2'];
    this.el = this.compile("<display-errors></display-errors>")(this.scope);
    this.scope.$apply();
  }));

  it('renders the errors to the html', function() {
    expect(this.el.find('div:first').html()).toMatch('err1');
    expect(this.el.find('div:last').html()).toMatch('err2');
  });

});
