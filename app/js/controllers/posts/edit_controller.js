App.controller('PostsEditController', function($scope, $routeParams, $location, Post) {

  loadPost = function() {
    success = function() {
      if (!$scope.post.isOwner($scope.user.id)) {
        $location.path('/posts/' + $routeParams.id);
      }
    };
    failure = function() {
      $location.path('/posts');
    };
    $scope.post = Post.get({id: $routeParams.id}, success, failure);
  };

  $scope.save = function() {
    success = function() {
      $scope.setFlash('success', 'Post has been saved!');
      $location.path('/posts/' + $scope.post.id);
    };
    $scope.post.$update({}, success);
  };

  $scope.cancel = function() {
    if (confirm("Are you sure?")) {
      $location.path('/posts/' + $scope.post.id);
    }
  };

  loadPost();

});
