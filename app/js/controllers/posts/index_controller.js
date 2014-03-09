App.controller('PostsIndexController', function($scope, Post) {
  $scope.posts = Post.query();
});
