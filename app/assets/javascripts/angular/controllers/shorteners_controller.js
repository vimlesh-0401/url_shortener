(function(){
  var app = angular.module('urlShortener');

  app.controller('ShortenersController', ["$scope", "$http", function($scope, $http){
    $scope.shortener = {};
    $scope.shorteners = [];
    $scope.pageSize = 0;
    $scope.pageSkip = 0;
    $scope.$child;

    $scope.createDilute = function(){
      $http.post('/shorteners.json', {shortener: $scope.shortener})
      .then(function(response){
        $scope.rebuildIndex();
      })
      $scope.shortener = {};
    }

    $scope.delete = function(shortener, index){
      $http({
        method: 'DELETE',
        url: '/shorteners/'+shortener.id+'.json',
        headers: {
          'Content-Type': undefined
        },
        data: { shortener: shortener }
      }).then(function(response){
        $scope.rebuildIndex();
      });
    }

    $scope.fetchShorteners = function(data){
      $http.get('/shorteners.json', {params: data})
      .then(function(response) {
        $scope.shorteners = response.data;
      });
    }

    $scope.rebuildIndex = function(){
      $http.get('/index/pages.json', {params:{}})
      .then(function(response) {
        $scope.$broadcast('rebuidPages', response.data);
      });
    }

    $scope.$on('fetchRecords', function(e, data){
      $scope.fetchShorteners(data)
    })
  }]);
})();