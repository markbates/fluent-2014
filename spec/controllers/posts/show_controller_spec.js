describe('PostsShowController', function() {

  beforeEach(inject(function($rootScope, _$httpBackend_, $controller) {
    this.http = _$httpBackend_;
    this.http.whenGET('/api/posts/1').respond({id: 1, user_id: 42, title: 'Hi!'});
    this.http.whenGET('/api/users/42').respond({id: 42, username: 'homer'});
    this.scope = $rootScope.$new();
    this.location = {};
    this.functionSpy(this.location, 'path');
    $controller('PostsShowController', {$scope: this.scope, $location: this.location, $routeParams: {id: 1}});
    this.http.flush();
  }));

  describe('retrieves the post', function() {

    it('sets the owner on the scope', function() {
      expect(this.scope.owner.username).toEqual('homer');
    });

  });

  describe('isOwner()', function() {

    describe('is currently logged in', function() {

      beforeEach(function() {
        this.scope.isLoggedIn = function() {
          return true;
        }
      });

      describe('is owner', function() {

        beforeEach(function() {
          this.scope.user = {id: 42};
        });

        it('returns true', function() {
          expect(this.scope.isOwner()).toBeTruthy();
        });

      });

      describe('is not owner', function() {

        beforeEach(function() {
          this.scope.user = {id: 43};
        });

        it('returns false', function() {
          expect(this.scope.isOwner()).toBeFalsy();
        });

      });

    });

    describe('is not logged in', function() {

      beforeEach(function() {
        this.scope.isLoggedIn = function() {
          return false;
        }
      });

      it('returns false', function() {
        expect(this.scope.isOwner()).toBeFalsy();
      });

    });

  });

  describe('delete()', function() {

    beforeEach(function() {
      this.functionSpy(window, 'confirm')
    });

    describe('confirms delete', function() {

      beforeEach(function() {
        window.confirmSpy.returns(true);
        this.functionSpy(this.scope, 'setFlash');
        this.http.whenDELETE('/api/posts/1').respond(200);
        this.scope.delete();
        this.http.flush();
      });

      it('sets a flash message', function() {
        expect(this.scope.setFlashSpy).toHaveBeenCalledWith('alert', 'Post has been destroyed!');
      });

      it('redirects to /posts', function() {
        expect(this.location.pathSpy).toHaveBeenCalledWith('/posts');
      });

    });

    describe('does not confirm', function() {

      beforeEach(function() {
        window.confirmSpy.returns(false);
        this.functionSpy(this.scope.post, '$delete')
      });

      it('does nothing', function() {
        this.scope.delete();
        expect(this.scope.post.$deleteSpy).not.toHaveBeenCalled();
      });

    });

  });

});
