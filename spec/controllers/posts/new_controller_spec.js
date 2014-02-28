describe('PostsNewController', function() {

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
    this.http = _$httpBackend_;
    this.scope = $rootScope.$new();
    this.scope.user = {id: 1};
    this.location = {};
    this.functionSpy(this.location, 'path');
    $controller('PostsNewController', {$scope: this.scope, $location: this.location});
  }));

  describe('save()', function() {

    beforeEach(function() {
      this.functionSpy(this.scope, 'setFlash');
      this.http.whenPOST('/api/posts').respond({id: 42});
    });

    it('sets the user_id of the post', function() {
      expect(this.scope.post.user_id).toBeUndefined();
      this.scope.save();
      expect(this.scope.post.user_id).toEqual(1);
    });

    it('sets a flash message', function() {
      this.scope.save();
      this.http.flush();
      expect(this.scope.setFlashSpy).toHaveBeenCalledWith('success', 'Post has been saved!');
    });

    it('redirects to the post', function() {
      this.scope.save();
      this.http.flush();
      expect(this.location.pathSpy).toHaveBeenCalledWith('/posts/42');
    });

  });

  describe('cancel()', function() {

    beforeEach(function() {
      this.functionSpy(window, 'confirm')
      this.scope.post = {id: 1};
    });

    describe('confirms cancel', function() {

      beforeEach(function() {
        window.confirmSpy.returns(true);
      });

      it('exits the page', function() {
        this.scope.cancel();
        expect(this.location.pathSpy).toHaveBeenCalledWith('/posts');
      });

    });

    describe('does not confirm', function() {

      beforeEach(function() {
        window.confirmSpy.returns(false);
      });

      it('does nothing', function() {
        this.scope.cancel();
        expect(this.location.pathSpy).not.toHaveBeenCalled();
      });

    });

  });

});
