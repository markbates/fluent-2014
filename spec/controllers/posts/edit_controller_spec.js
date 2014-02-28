describe('PostsEditController', function() {

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
    this.http = _$httpBackend_;
    this.scope = $rootScope.$new();
    this.scope.user = {id: 42};
    this.location = {};
    this.functionSpy(this.location, 'path');
    $controller('PostsEditController', {$scope: this.scope, $location: this.location, $routeParams: {id: 1}});
  }));

  describe('retrieving post from api', function() {

    describe('found post', function() {

      beforeEach(function() {
        this.http.whenGET('/api/posts/1').respond({id: 1, user_id: 42, title: 'Hi!'});
      });

      describe('user is owner', function() {

        it('sets the post object', function() {
          this.http.flush();
          expect(this.scope.post.title).toEqual('Hi!');
        });
      });

      describe('user isnt owner', function() {

        it('redirects to the post page', function() {
          this.scope.user.id = 24;
          this.http.flush();
          expect(this.location.pathSpy).toHaveBeenCalledWith('/posts/1');
        });
      });

    });

    describe('post not found', function() {

      beforeEach(function() {
        this.http.whenGET('/api/posts/1').respond(404);
      });

      it('redirects to the /posts page', function() {
        this.http.flush();
        expect(this.location.pathSpy).toHaveBeenCalledWith('/posts');
      });

    });

  });

  describe('save()', function() {

    beforeEach(function() {
      this.functionSpy(this.scope, 'setFlash');
      this.http.whenGET('/api/posts/1').respond({id: 1, user_id: 42, title: 'Hi!'});
      this.http.whenPUT('/api/posts/1').respond(200);
      this.http.flush();
      this.scope.save();
      this.http.flush();
    });

    it('sets a flash message', function() {
      expect(this.scope.setFlashSpy).toHaveBeenCalledWith('success', 'Post has been saved!');
    });

    it('redirects to the post', function() {
      expect(this.location.pathSpy).toHaveBeenCalledWith('/posts/1');
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
        expect(this.location.pathSpy).toHaveBeenCalledWith('/posts/1');
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
