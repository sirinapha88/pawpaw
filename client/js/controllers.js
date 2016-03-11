app.controller("Searching", function($scope, $rootScope, $routeParams, $http,$location){
		
		$http.get("/search").success(function(data){
			console.log("this is from controller " + data);
			$scope.hotels = data;
			
		});
	
});