app.controller("Searching", function($scope,cartService,requestService, $rootScope, $routeParams, $http, $location){
    $scope.cart = [];
    $scope.request = [];

	$scope.searchHotel = function(query) {
        var city = query.city.split(',');
        requestService.request.push(query);
		$http.get("/search/" + city).success(function(data){   
        // console.log(data);       
            cartService.cart.push(data);				
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
    // console.log(cartService.cart[0])
    $location.path('/Hotels');
    $scope.hotelDetail = [];
    
    $scope.getHotel = function(id){
        $http.get("/search/hotel/" + id).success(function(data){
            cartService.cart.push(data);
            // console.log(cartService.cart)
             $location.path('/hotel/:' + id);
        })      
    };
});

app.controller("HotelDetail", function($scope,cartService,$rootScope, $routeParams, $http, $location) {
    $scope.details = cartService.cart[1];
    console.log(cartService.cart[1][0].room_Rate.room_detail[0].detail);
    var images = getPhoto(cartService.cart[1][0].imgURL.photos)
    var detailToSplit = getDetail(cartService.cart[1][0].room_Rate.room_detail[0].detail)
    console.log(detailToSplit)
    $scope.slides = images;
    $scope.displayDetail = detailToSplit
    
    $scope.booked = function(id){
        $location.path('/booking');
    }  
}); 

function getPhoto(photos){
    var photoArr = [];
    for (var i = 0; i < photos.length; i++) {
        photoArr.push({images: photos[i]});
    }
    return photoArr;
}

function getDetail(details){
    var detail = details.split(/[.,]+/);
    return detail;
}


app.controller("BookingCtrl", function($scope,cartService, requestService,$rootScope, $routeParams, $http, $location){
    $scope.details = cartService.cart[1];
    $scope.cusRequest = requestService.request[0];
    console.log(requestService.request[0])
    $scope.User = {};
    
    $scope.placeOrder = function(hotel){
        var postData = {
            user: $scope.User,
            hotel: cartService.cart[1],
            request: requestService.request[0]
        }
        $http.post('/search/hotel', postData)
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
                console.log(data)
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
                console.log(data)
                $location.path('/');
            }).error(function(err) {
                $scope.errorMessage = err;
            });
    };
});