angular.module('app').controller('PostsNewController', function($scope, $location, Post) {

  $scope.post = new Post();

  $scope.save = function() {
    $scope.post.user_id = $scope.user.id;
    success = function() {
      $scope.setFlash('success', 'Post has been saved!');
      $location.path('/posts/' + $scope.post.id);
    };
    $scope.post.$save({}, success);
  };

  $scope.cancel = function() {
    if (confirm("Are you sure?")) {
      $location.path('/posts');
    }
  };

});
