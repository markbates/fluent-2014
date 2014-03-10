describe("User", function() {

  beforeEach(inject(function(User, _$httpBackend_){
    this.http = _$httpBackend_;
    this.User = User;
    this.user = new User();
  }));

  describe('member url', function() {

    it('inserts the id correctly', function() {
      this.http.whenGET('/api/users/42').respond({id: 42});
      u = this.User.get({id: 42});
      this.http.flush();
      expect(u.id).toEqual(42);
    });

    it('gets the id from the object', function() {
      this.http.whenPOST('/api/users/42').respond({id: 42});
      this.user.id = 42;
      this.user.$save();
      this.http.flush();
    });

  });

  describe('$update()', function() {

    it('has an $update function that makes a PUT request', function() {
      this.http.whenPUT('/api/users/42').respond({id: 42});
      this.user.id = 42;
      this.user.$update();
      this.http.flush();
    });
  });

});
