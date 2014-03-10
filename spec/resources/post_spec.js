describe("Post", function() {

  beforeEach(inject(function(Post, _$httpBackend_){
    this.http = _$httpBackend_;
    this.Post = Post;
    this.post = new Post({user_id: 1});
  }));

  describe('member url', function() {

    it('inserts the id correctly', function() {
      this.http.whenGET('/api/posts/42').respond({id: 42});
      p = this.Post.get({id: 42});
      this.http.flush();
      expect(p.id).toEqual(42);
    });

    it('gets the id from the object', function() {
      this.http.whenPOST('/api/posts/42').respond({id: 42});
      this.post.id = 42;
      this.post.$save();
      this.http.flush();
    });

  });

  describe('$update()', function() {

    it('has an $update function that makes a PUT request', function() {
      this.http.whenPUT('/api/posts/42').respond({id: 42});
      this.post.id = 42;
      this.post.$update();
      this.http.flush();
    });
  });

  describe('isOwner()', function() {

    it('validates the user owns the post', function() {
      expect(this.post.isOwner(1)).toBeTruthy();
      expect(this.post.isOwner(2)).toBeFalsy();
    });

  });

});
