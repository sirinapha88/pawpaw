app.controller("Searching", function($scope,cartService, $rootScope, $routeParams, $http, $location){
    $scope.cart = [];

	$scope.searchHotel = function(query) {
        var city = query.split(',');
        console.log(city[0])
		$http.get("/search/" + city).success(function(data){          
			console.log(data);
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

app.controller("HotelList",function($scope,cartService,hotelService, $rootScope, $routeParams, $http, $location){
    $scope.hotels = cartService.cart[0];
    $location.path('/Hotels');
    $scope.hotelDetail = [];
    
    $scope.getHotel = function(id){
        $http.get("/search/hotel/" + id).success(function(data){
            // console.log(data)
            hotelService.hotelDetail.push(data);
             $location.path('/hotel/:' + id);
        })      
    };
});

app.controller("HotelDetail", function($scope, hotelService,$rootScope, $routeParams, $http, $location) {
    $scope.details = hotelService.hotelDetail[0];
    console.log("thisis detail" + hotelService.hotelDetail[0])

    $scope.booked = function(id){

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