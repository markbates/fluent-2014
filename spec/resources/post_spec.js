describe("Post", function() {

  beforeEach(inject(function(Post){
    this.post = new Post({user_id: 1});
  }));

  describe('isOwner()', function() {

    it('validates the user owns the post', function() {
      expect(this.post.isOwner(1)).toBeTruthy();
      expect(this.post.isOwner(2)).toBeFalsy();
    });

  });

});
