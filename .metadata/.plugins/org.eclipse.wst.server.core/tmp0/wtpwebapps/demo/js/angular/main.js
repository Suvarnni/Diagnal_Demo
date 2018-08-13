var diaApp = angular.module('diagnalApp', []);
diaApp.controller('diagnalCtrl', function($scope, $http, $window, $filter) {
	$scope.gData = {
		pageNumber : 1,
		pageList : '',
		moviesList : '',
		display : {
			search : false
		}
	}
	$scope.pageLoad = function(){
	 $http.get('./API/CONTENTLISTINGPAGE-PAGE'+ $scope.gData.pageNumber + '.json')
		.then(function (response){
			$scope.gData.pageList = response.data;
			$scope.gData.moviesList = $scope.gData.pageList.page["content-items"].content
			$scope.gData.display.search = false;
		}).catch(function(response) {
		  console.error('Error occurred:', response.status, response.data);
		}).finally(function() {
			 console.log("Task Finished.");
		});
	}
	$scope.pageLoad();
	$scope.showSearch = function() {
		$scope.gData.display.search = true;
		var txtSearch = $window.document.getElementById('inputGroup');
		txtSearch.focus();
	}
	$scope.search = function() {
		if ($scope.gData.keyword != undefined && $scope.gData.keyword.length > 0) {
			var pages = $filter('filter')($scope.gData.pageList.page["content-items"].content, {
				$ : $scope.gData.keyword
			});
			$scope.gData.moviesList = pages;
		}
	}
	$scope.back = function(){
		$scope.pageLoad();
	}
});
diaApp.filter("commaBreak",function() {
	return function(value) {
		if (!value.length)
			return;
		return value.split(',');
	}
});