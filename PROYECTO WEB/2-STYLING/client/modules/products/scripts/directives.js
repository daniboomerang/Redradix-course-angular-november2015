var productsDirectives = angular.module('productsDirectives', ['productsServices']);  

productsDirectives.directive('index', function() {
  return {
    restrict: 'E',
    templateUrl: 'modules/products/views/index.html'
  };
});

productsDirectives.directive('products', function(Products, $q) {
  return {
    restrict: 'E',
    templateUrl: 'modules/products/views/products.html',
    controller: function($scope) {
      Products.list().then(function(productsList) {
        $scope.productsList = productsList;
      }, function(reason) {
        alert('Failed: ' + reason);
      });     
    }
  };
});

productsDirectives.directive('productsNavbar', function($location) {
  return {
    restrict: 'EA',  
    templateUrl: 'modules/products/views/products-navbar.html',
    link: function (scope, element) {

      init();

      function init() {
        scope.currentProductName = $location.path().substring(1).split("/")[1];
        scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
          scope.currentProductName = $location.path().substring(1).split("/")[1];
        })
      }
    }  
  };
});

productsDirectives.directive('product', function($state, Products) {
  return {
    restrict: 'E',
    templateUrl: 'modules/products/views/product.html',
    controller: function($scope) {
      Products.open($state.params.productName).then(function(product) {
        $scope.product = product;
      });
    }
  };
});


productsDirectives.directive('productNavbar', function() {
  return {
    restrict: 'EA',  
    templateUrl: 'modules/products/views/product-navbar.html',
    scope: {
      product: '='
    },
    link: function (scope, element, attrs) {

      init();

      function init() {

        scope.$watch('product', function() { 
          if (scope.product != undefined) { 
            scope.productName = scope.product.name;
            scope.productSubsections = [];
            for (var i=0; i<scope.product.subsections.length; i++){
              scope.productSubsections.push(scope.product.subsections[i].name);
            }
          } 
        });
      }
    }  
  };
});
