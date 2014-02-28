describe('Directive - validatesPresence', function() {

  beforeEach(inject(function($rootScope, _$compile_) {
    this.compile = _$compile_;
    this.scope = $rootScope.$new();
    this.scope.errors = [];
  }));

  describe('blank value', function() {

    beforeEach(function() {
      this.el = this.compile("<input value='' name='foo' validates-presence>")(this.scope);
      this.scope.$broadcast('validate-form');
      this.scope.$apply();
    });

    it('sets an error', function() {
      expect(this.scope.errors.length).toEqual(1);
      expect(this.scope.errors[0]).toEqual("Foo can't be blank!");
    });

  });

  describe('non-blank value', function() {

    beforeEach(function() {
      this.el = this.compile("<input value='bar' name='foo' validates-presence>")(this.scope);
      this.scope.$apply();
    });

    it('does nothing', function() {
      expect(this.scope.errors.length).toEqual(0);
    });

  });

});
