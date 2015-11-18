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

productsDirectives.directive('productSubsection', function($compile) {
  return {
    restrict: 'E',
    scope: {
      info: '='  // Using the same name as the attribute
    },
    compile: function compile(tElement, tAttrs, transclude) {
    
      function createHtmlSubelementText(text, classes) {
        var html = '<div class="subsection-subelement-wrapper ' + classes + '"><div class="subsection-subelement">' + text + '</div></div>';
        return html;
      }

      function createHtmlSubelementImage(src, classes) {
        var html = '<div class="subsection-subelement-wrapper ' + classes + '"><div class="subsection-subelement"><img class="img-responsive" alt="" src="' + src + '"></div></div>';
        return html;     
      }

      function createHtml(subsection) {
        var html;
        if (subsection.type == 'text-image') {
          html = '<div class="subsection-element" style="background:' + subsection.background + '">' + createHtmlSubelementText(subsection.description, 'left') + createHtmlSubelementImage(subsection.image, 'right') + '</div>';
          return html;
            
        }
        else if (subsection.type == 'image-text') {
          html = '<div class="subsection-element" style="background:' + subsection.background + '">' + createHtmlSubelementImage(subsection.image, 'left') +createHtmlSubelementText(subsection.description, 'right') +  '</div>';
          return html;
            
        }
        else if (subsection.type == 'text') {
          html = '<div class="subsection-element" style="background:' + subsection.background + '">' + createHtmlSubelementText(subsection.description, 'center') + '</div>';
          return html;
            
        }
        else { 
          html = '<div class="subsection-element" style="background:' + subsection.background + '">' + createHtmlSubelementImage(subsection.image, 'center') + '</div>';
          return html;
        } 
      }

      return {
        pre: function preLink(scope, iElement, iAttrs) { 
          var html = createHtml(scope.info)
          iElement.append(html);
        },
        post: function postLink(scope, iElement, iAttrs) { 

        }
      }
    }
  };
});

productsDirectives.directive('technicalSpecifications', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='  // Using the same name as the attribute
    },
    templateUrl: 'modules/products/views/technical-specifications.html',
    controller: function($scope) {
      $scope.$watch('info', function() { 
        if ($scope.info != undefined) {
          ($scope.info.design !=  undefined ) ? $scope.design = $scope.info.design: $scope.design = false;
          ($scope.info.chip !=  undefined ) ? $scope.chip = $scope.info.chip: $scope.chip = false;
          ($scope.info.camera !=  undefined ) ? $scope.camera = $scope.info.camera: $scope.camera = false;
          ($scope.info.display !=  undefined ) ? $scope.display = $scope.info.display: $scope.display = false;
        } 
      })
    }  
  };
});