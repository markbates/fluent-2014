App.directive('displayErrors', function() {
  return {
    restrict: 'E',
    templateUrl: '_errors.html',
    link: function(scope, el, attrs) {
      scope.$watch("errors", function() {
        if (scope.errors && scope.errors.length > 0) {
          setTimeout(function() {
            $(el).find('.alert-danger').hide();
          }, 7000);
        }
      });
    }
  };
});
