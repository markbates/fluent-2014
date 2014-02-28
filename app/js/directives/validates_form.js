angular.module('app').directive('validatesForm', function() {
  return {
    link: function(scope, elem, attrs) {
      form = $(elem);
      form.submit(function(event) {
        scope.errors = [];
        event.preventDefault();
        scope.$broadcast('validate-form', form);
        if (scope.errors.length === 0) {
          scope.$eval(attrs.validatesForm);
        } else {
          scope.$digest();
        }
      });
    }
  };
});
