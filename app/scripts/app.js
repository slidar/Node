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
