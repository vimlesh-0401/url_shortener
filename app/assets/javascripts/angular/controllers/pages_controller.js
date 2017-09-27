(function(){
  var app = angular.module('urlShortener');
  app.controller('PagesController',["$scope", "$http", function($scope, $http){
    $scope.page = {
      pages: [], pageCount: 0,
      pageSize: 3, totalRecord: 1,
      activePage: 1, pageSkip: 0,
      startIndex: 1, endIndex: 1
    };
    $scope.$child = $scope;

    $scope.updatePage = function(){
      if($scope.page.pageSize===NaN
        || $scope.page.pageSize === null
        || $scope.page.pageSize===undefined){
        return;
      }
      $scope.page.activePage = 1;
      $scope.informParent();
    }

    $scope.isActive = function(page){
      return ($scope.page.activePage === page) ? 'active': '';
    }

    $scope.setPage = function(page, exact){
      if(exact){
        $scope.page.activePage = page;
      }else{
        $scope.page.activePage += page;
      }
      $scope.informParent();
    }

    $scope.setActive = function(page){
      $scope.setPage(page, true)
    }

    $scope.canNext = function(){
      return $scope.page.activePage < $scope.page.pageCount;
    }

    $scope.nextPage = function(){
      if($scope.canNext()){
        $scope.setPage(1, false);
      }
    }

    $scope.canLast = function(){
      return $scope.page.endIndex < $scope.page.pageCount;
    }

    $scope.lastPage = function(){
      if($scope.canNext()){
        $scope.setPage($scope.page.pageCount, true);
      }
    }

    $scope.canPrev = function(){
      return $scope.page.activePage > 1;
    }

    $scope.prevPage = function(){
      if($scope.canPrev()){
        $scope.setPage(-1, false);
      }
    }

    $scope.canFirst = function(){
      return $scope.page.startIndex > 1;
    }

    $scope.firstPage = function(){
      if($scope.canPrev()){
        $scope.setPage(1, true);
      }
    }

    $scope.fetchPages = function(records){
      $scope.page.totalRecord = records;
      $scope.informParent();
    }

    $scope.informParent = function(){
      $scope.page.pageSkip = ($scope.page.activePage-1)*($scope.page.pageSize);
      $scope.buildPages();
      $scope.$emit('fetchRecords', {pageSize: $scope.page.pageSize, pageSkip: $scope.page.pageSkip});
    }

    $scope.buildPages = function(){
      pg = $scope.page.totalRecord%$scope.page.pageSize;
      pi = parseInt($scope.page.totalRecord/$scope.page.pageSize);
      ps = pi+(pg > 0 ? 1: 0);
      $scope.page.pageCount = (ps > 0 ? ps : 1);
      $scope.pageRange();
    }

    $scope.pageRange = function(){
      cIndex = $scope.page.activePage;
      tPages = $scope.page.pageCount;
      sIndex = cIndex, eIndex = cIndex;

      for(var i = 1; i < 3; i++){
        if(sIndex > 1){ sIndex -= 1; }else{ eIndex+=1; }
        if(eIndex < tPages){ eIndex += 1; }else{ sIndex-=1; }
      }

      sIndex = Math.max(sIndex, 1);
      eIndex = Math.min(eIndex, tPages);

      if(sIndex>1){sIndex-=1;}else if(eIndex<tPages){eIndex+=1;}

      rng = []
      for( var i = sIndex; i <= eIndex; i ++ ){
        rng.push(i)
      }
      $scope.page.startIndex = sIndex, $scope.page.endIndex = eIndex;
      $scope.page.pages = rng;
    }

    $scope.$on('rebuidPages', function(e, data){
      $scope.page.activePage = 1;
      $scope.fetchPages(data);
    })
  }])
})()