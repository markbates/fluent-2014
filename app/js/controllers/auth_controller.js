angular.module('app').controller('AuthController', function($scope, $cookieStore, Auth) {

  $scope.user = null;

  $scope.isLoggedIn = function() {
    return $scope.user != null;
  };

  $scope.signIn = function(username) {
    promise = Auth.get({username: username}).$promise;
    success = function(result) {
      $scope.user = result;
      $cookieStore.put('username', username);
    };
    failure = function(results) {
      $scope.signOut();
      $scope.setFlash('danger', results.data.error);
    };
    promise.then(success, failure);
  };

  $scope.signOut = function() {
    $cookieStore.remove('username');
    $scope.user = null;
  };

  $scope.autoLogin = function() {
    if (!$scope.isLoggedIn() && $cookieStore.get('username') != null) {
      $scope.signIn($cookieStore.get('username'));
    }
  };

  $scope.autoLogin();

});
