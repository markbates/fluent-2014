angular.module('app').controller('PostsIndexController', function($scope, Post) {
  $scope.posts = Post.query();
});
