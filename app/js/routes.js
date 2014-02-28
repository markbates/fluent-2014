App.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/posts', {
    controller: 'PostsIndexController', templateUrl: 'posts/index.html'
  })
  // requires authentication, perhaps use resolve??
  .when('/posts/new',{
    controller: 'PostsNewController', templateUrl: 'posts/new.html'
  })
  .when('/posts/:id',{
    controller: 'PostsShowController', templateUrl: 'posts/show.html'
  })
  // requires authentication, perhaps use resolve??
  .when('/posts/:id/edit',{
    controller: 'PostsEditController', templateUrl: 'posts/edit.html'
  })
  .otherwise({
    redirectTo: '/posts'
  });
});
