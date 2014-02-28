describe('AppController', function() {

  beforeEach(inject(function($rootScope, $controller) {
    this.scope = $rootScope.$new();
    $controller('AppController', {$scope: this.scope});
  }));

  describe('setFlash()', function() {

    it('sets the flash object', function() {
      this.scope.setFlash('danger', 'Some message');
      expect(this.scope.flash.type).toEqual('danger');
      expect(this.scope.flash.message).toEqual('Some message');
    });

  });

});
