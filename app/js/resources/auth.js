App.factory('Auth', function($resource) {
  return $resource("/api/users/auth/:username", {
    username: "@username"
  });
});
