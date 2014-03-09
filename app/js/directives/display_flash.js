App.directive('displayFlash', function() {
  return {
    restrict: 'E',
    templateUrl: '_flash.html',
    link: function(scope, el, attrs) {
      scope.$watch("flash", function() {
        if (scope.flash) {
          setTimeout(function() {
            $(el).find('.alert').hide();
          }, 7000);
        }
      });
    }
  };
});
