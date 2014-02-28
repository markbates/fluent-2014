App.factory('Post', function($resource) {
  Post = $resource("/api/posts/:id", {
    id: "@id"
  }, {
    update: {
      method: 'PUT'
    }
  });

  Post.prototype.isOwner = function(user_id) {
    return this.user_id === user_id;
  };

  return Post;
});
