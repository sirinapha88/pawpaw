app.controller("Searching", function($scope, $rootScope, $routeParams, $http, $location){
	$http.get("/search").success(function(data){
		$scope.hotels = data;
	});

    $http.get("/gHotel").success(function(data){
    	console.log("this is from controller " + data);
    	$scope.gHotels = data;
    })
});

app.controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.User = {};
    $scope.errorMessage = '';

    $scope.register = function() {
        $http.post('/signup', $scope.User)
        	.success(function(data) {
                $location.path('/');
            }).error(function(err) {
                $scope.errorMessage = err;
            });
    }
});