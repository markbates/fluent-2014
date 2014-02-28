describe('AuthController', function() {

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
    this.http = _$httpBackend_;
    this.scope = $rootScope.$new();
    this.cookieStore = {};
    this.functionSpy(this.cookieStore, 'get');
    this.functionSpy(this.cookieStore, 'put');
    this.functionSpy(this.cookieStore, 'remove');
    $controller('AuthController', {$scope: this.scope, $cookieStore: this.cookieStore});
  }));

  describe('isLoggedIn()', function() {

    it('returns true if the user is logged in', function() {
      expect(this.scope.isLoggedIn()).toBeFalsy();
      this.scope.user = {};
      expect(this.scope.isLoggedIn()).toBeTruthy();
    });

  });

  describe('signIn()', function() {

    describe('valid user', function() {

      beforeEach(function() {
        this.http.whenGET('/api/users/auth/homer').respond({id: 1, username: 'homer'});
        this.scope.signIn('homer');
        this.http.flush();
      });

      it('sets the user on the scope', function() {
        expect(this.scope.user.id).toEqual(1);
      });

      it('sets a cookie', function() {
        expect(this.cookieStore.putSpy).toHaveBeenCalledWith('username', 'homer');
      });

    });

    describe('invalid user', function() {

      beforeEach(function() {
        this.functionSpy(this.scope, 'setFlash');
        this.functionSpy(this.scope, 'signOut');
        this.http.whenGET('/api/users/auth/homer').respond(401, {error: 'wtf?'});
        this.scope.signIn('homer');
        this.http.flush()
      });

      it('sets a flash message', function() {
        expect(this.scope.user).toBeNull();
        expect(this.scope.setFlashSpy).toHaveBeenCalledWith('danger', 'wtf?');
      });

      it('calls the signOut function to clean up', function() {
        expect(this.scope.signOutSpy).toHaveBeenCalledOnce();
      });

    });

  });

  describe('signOut()', function() {

    it('removes the username cookie', function() {
      this.scope.signOut();
      expect(this.cookieStore.removeSpy).toHaveBeenCalledWith('username');
    });

    it('sets the user to null', function() {
      this.scope.user = {};
      expect(this.scope.user).not.toBeNull();
      this.scope.signOut();
      expect(this.scope.user).toBeNull();
    });

  });

  describe('autoLogin()', function() {

    beforeEach(function() {
      this.functionSpy(this.scope, 'signIn');
    });

    describe('not logged in', function() {

      describe('with a cookie', function() {

        beforeEach(function() {
          this.cookieStore.get = function() {
            return 'homer';
          }
        });

        it('tries to sign the user in', function() {
          this.scope.autoLogin();
          expect(this.scope.signInSpy).toHaveBeenCalledWith('homer');
        });

      });

      describe('without a cookie', function() {

        it('does nothing', function() {
          this.scope.autoLogin();
          expect(this.scope.signInSpy).not.toHaveBeenCalled();
        });

      });

    });

    describe('already logged in', function() {

      beforeEach(function() {
        this.scope.user = {};
      });

      it('does nothing', function() {
        this.scope.autoLogin();
        expect(this.scope.signInSpy).not.toHaveBeenCalled();
      });

    });

  });

});
