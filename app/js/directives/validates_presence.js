App.directive('validatesPresence', function() {
  return {
    link: function(scope, elem, attrs) {
      scope.$on('validate-form', function(form) {
        el = $(elem);
        group = el.closest('.form-group');
        group.removeClass('has-error');
        if (el.val() === '') {
          scope.errors.push(el.attr('name').capitalize() + " can't be blank!");
          group.addClass('has-error').addClass('has-feedback');
        }
      });
    }
  };
});
