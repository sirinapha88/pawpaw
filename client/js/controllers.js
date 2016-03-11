app.controller("Searching", function($scope, $rootScope, $routeParams, $http,$location){
		
		$http.get("/search").then(function(data){
			console.log("this is from controller" + data);
			$scope.hotelName = data.name;
			$scope.hotelPic = data.image_url;
		});
	
});