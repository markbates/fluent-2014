angular.module('app').controller('AppController', function($scope) {

  $scope.setFlash = function(type, message) {
    $scope.flash = {type: type, message: message};
  };
});
