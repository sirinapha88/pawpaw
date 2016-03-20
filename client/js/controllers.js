app.controller("Searching", function($scope,cartService, $rootScope, $routeParams, $http, $location){
    $scope.cart = [];

	$scope.searchHotel = function(query) {
        var city = query.split(',');
        console.log(city[0])
		$http.get("/search").success(function(data){          
			// console.log(data);
            cartService.cart.push(data);				
            // console.log(cartService.cart);  
            $location.path('/Hotels');
		})
    };

    // $http.get("/gHotel").success(function(data){
    // 	console.log("this is from controller " + data);
    // 	$scope.gHotels = data;
    // });

	
});

app.controller("HotelList",function($scope, cartService, $location){
    $scope.hotels = cartService.cart[0];
    $location.path('/Hotels');
    
    $scope.getHotel = function(data){
        $location.path('/hotel');
    };
});

app.controller("HotelDetail", function($scope, $rootScope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $scope.booked = function(){
        $location.path('/booking');
    }  
}); 

app.controller("BookingCtrl", function($scope,cartService, $rootScope, $routeParams, $http, $location){
    console.log("in booking");
    $scope.hotels = cartService.cart[0];
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