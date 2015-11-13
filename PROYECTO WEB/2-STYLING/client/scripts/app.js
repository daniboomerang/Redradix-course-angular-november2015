'use strict';

var app = angular.module('app', [
	'ui.router',
	'home',
	'products'
]);

app.config(
  [ '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

		/////////////////////////////
		// Redirects and Otherwise //
		/////////////////////////////

		// Example of using function rule as param
	    $urlRouterProvider.otherwise(function($injector, $location){
	        return '/' + $location.path();
	    });

		$stateProvider
	    
	    //////////////////////////
		// State Configurations //
		//////////////////////////
	    
	    .state('404', {
	    	url: '/{path:.*}',
	        template: '<page-not-found></page-not-found>'
	    })

		$locationProvider.html5Mode(true); 
    }
  ]
);

app.directive('navbar', function($location) {
  return {
    restrict: 'A',  
    scope: {},
    templateUrl: 'views/navbar.html',
    link: function (scope, element) {

      init();

      scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        scope.currentModuleName = $location.path().substring(1).split("/")[0];
      })
      
      function init() {
        scope.currentModuleName = $location.path().substring(1).split("/")[0];
        scope.modules = [
          { idLink: 'products-idLink', state: 'products.list', name: 'products', text:'Products' }
        ];
      }
    }  
  };
});

app.directive('footer', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/footer.html'
  };
});

app.directive('pageNotFound', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/page-not-found.html',
    controller: function($scope, $state, $location) {
        $scope.pageNotFound = 'http://' + $location.host() + $location.port() + '/' + $state.params.path;
    }
  };
});