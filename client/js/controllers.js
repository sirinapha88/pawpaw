app.controller("Searching", function($scope,cartService,requestService, $rootScope, $routeParams, $http, $location){
    $scope.cart = [];
    $scope.request = [];

	$scope.searchHotel = function(query) {
        var city = query.city.split(',');
        requestService.request.push(query);
        console.log(query)
        console.log(city)
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
    console.log(hotelService.hotelDetail[0])

    $scope.booked = function(id){
        $location.path('/booking');
    }  
}); 

app.controller("BookingCtrl", function($scope,hotelService, requestService,$rootScope, $routeParams, $http, $location){
    $scope.details = hotelService.hotelDetail[0];
    $scope.cusRequest = requestService.request[0];
    $scope.User = {};
    $scope.placeOrder = function(hotel){
        console.log(hotel);
        $http.post('/hotel', $scope.User)
            .success(function(data) {
                $location.path('/');
            }).error(function(err) {
                $scope.errorMessage = err;
            });
    }
    
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