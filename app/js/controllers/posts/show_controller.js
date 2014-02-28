angular.module('app').controller('PostsShowController', function($scope, $routeParams, $location, Post, User) {

  loadPost = function() {
    success = function() {
      $scope.owner = User.get({id: $scope.post.user_id});
    };
    $scope.post = Post.get({id: $routeParams.id}, success);
  };

  $scope.isOwner = function() {
    return $scope.isLoggedIn() && $scope.post.isOwner($scope.user.id);
  };

  $scope.delete = function() {
    if (confirm("Are you sure?")) {
      success = function() {
        $scope.setFlash('alert', 'Post has been destroyed!');
        $location.path("/posts");
      };
      $scope.post.$delete({}, success);
    }
  };

  loadPost();

});
