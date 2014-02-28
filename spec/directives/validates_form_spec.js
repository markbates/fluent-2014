describe('Directive - validatesForm', function() {

  beforeEach(inject(function($rootScope, _$compile_) {
    this.compile = _$compile_;
    this.scope = $rootScope.$new();
    this.scope.bar = 0;
    this.el = this.compile("<form validates-form='bar=1'></form>")(this.scope);
  }));

  it('evals the expression if no errors', function() {
    $(this.el).submit();
    expect(this.scope.bar).toEqual(1);
  });

  it('does nothing if there are errors', function() {
    _this = this;
    this.scope.$on('validate-form', function() {
      _this.scope.errors = ['err'];
    });
    $(this.el).submit();
    expect(this.scope.bar).toEqual(0);
  });

});
