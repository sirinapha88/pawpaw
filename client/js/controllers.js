app.controller("Searching", function($scope, $rootScope, $routeParams, $http, $location){
    $scope.Hotels= {};

	$scope.searchHotel = function(query) {
		$http.get("/search").success(function(data){
            console.log(query);
			console.log(data);
			$scope.hotels = data;
			 $location.path('/search');
		}).error(function(err) {
                $scope.errorMessage = err;
            });
    };

    // $http.get("/gHotel").success(function(data){
    // 	console.log("this is from controller " + data);
    // 	$scope.gHotels = data;
    // });
	
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

app.controller('LoginCtrl', function ($scope, $http, $location) {
    $scope.User = {};
    $scope.errorMessage = '';

   	$scope.login = function() {
        $http.post('/login', $scope.User)
        	.success(function(data) {
                $location.path('/');
            }).error(function(err) {
                $scope.errorMessage = err;
            });
    };
});