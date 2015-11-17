var products = angular.module('products', [
	'productsDirectives',
	 // VENDOR
  	'duScroll'
]);  

products.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/products/', '/products');

	$stateProvider
	    
	    //////////////////////////
		// State Configurations //
		//////////////////////////
	    
        .state('products', {
        	abstract: true,
        	url: '/products',
			template: '<products></products>' // This is the 'Web Component' Products
        })	
        	// Nested Views
        	.state('products.list', {
	        	url: '',
				template: '<index></index>' // This is the 'Web Component' Products Index
        	})
        	.state('products.open', {
	        	url: '/:productName',
				template: '<product></product>'	// This is the 'Web Component' Product
        	})
})

products.run(function (scrollObserverService) { scrollObserverService.init(); });
products.value('duScrollEasing', function easingFunction(t) { return t*(2-t) });
/*products.value('duScrollOffset', 80);*/



