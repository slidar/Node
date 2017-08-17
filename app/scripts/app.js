<<<<<<< HEAD
(function() {
    function config($stateProvider, $locationProvider) {
       $locationProvider
        .html5Mode({
            enabled: true,
            requireBase: false
          });
    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: '/templates/landing.html'
        })
       .state('album', {
           url: '/album',
           templateUrl: '/templates/album.html'
         });
}

     angular
            .module('blocJams', ['ui.router'])
            .config(config);
    })();
=======
angular.module('blocJams', []);

$stateProvider {
    .state('collection', {
        url: "/collection",
        templateUrl: 'collection.html'
    })
  }

$stateProvider.state('collection', {
  templateUrl: function ($stateParams){
    return '/partials/collection.' + $stateParams.filterBy + '.html';
  }
})
>>>>>>> assignment-3-routing
