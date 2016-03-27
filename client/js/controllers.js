app.controller("Searching", function($scope,cartService,requestService, userService, $rootScope, $routeParams, $http, $location){
    $scope.cart = [];
    $scope.request = [];
    $scope.details = userService.UserDetail[0];

    $scope.hotelRoomOptions = [
        {name: 1,value: 1},
        {name: 2,value: 2},
        {name: 3,value: 3}
    ];
    $scope.Hotels = {};
    $scope.Hotels.numRoom = $scope.hotelRoomOptions[0];
    $scope.Hotels.numDog = $scope.hotelRoomOptions[0];
    $scope.Hotels.numCat = $scope.hotelRoomOptions[0];
    
	$scope.searchHotel = function(query) {
        var city = query.city.split(',');
        requestService.request.push(query);
		$http.get("/search/" + city).success(function(data){   
            cartService.cart.push(data);				
            $location.path('/Hotels');
		})
    };
});

app.controller("HotelList",function($scope,cartService, $rootScope, $routeParams, $http, $location){
    $scope.hotels = cartService.cart[0];
    $location.path('/Hotels');
    $scope.hotelDetail = [];
    $scope.order = 'price';
    
    $scope.active = function(x) {
        return x == $scope.order ? 'active' : '';
    }
    
    $scope.getHotel = function(id){
        $http.get("/search/hotel/" + id).success(function(data){
            cartService.cart.push(data);
            $location.path('/hotel/:' + id);
        })      
    };
});

app.controller("HotelDetail", function($scope,cartService,$rootScope, $routeParams, $http, $location) {
    $scope.details = cartService.cart[1];
    var images = getPhoto(cartService.cart[1][0].imgURL.photos);
    var detailToSplit = getDetail(cartService.cart[1][0].room_Rate.room_detail[0].detail);
    $scope.slides = images;
    $scope.displayDetail = detailToSplit;

    $scope.direction = 'left';
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
    
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

app.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent();
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent();
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});

app.controller("BookingCtrl", function($rootScope,$scope,cartService, requestService,userService,$rootScope, $routeParams, $http, $location){
    $scope.details = cartService.cart[1];
    $scope.cusRequest = requestService.request[0];
    $scope.User = userService.UserDetail[0];
    // $scope.User = {};

    
    $scope.placeOrder = function(hotel){
        var postData = {
            user: $scope.User,
            hotel: cartService.cart[1],
            request: requestService.request[0]
        }
        $http.post('/search/hotel', postData)
            .success(function(data) {
                console.log("in bookingCtrl")
                console.log(data)
                userService.UserDetail.push(data);
                $rootScope.$broadcast('user-logged-in');
                $location.path('/');
            }).error(function(err) {
                $scope.errorMessage = err;
            });
    }
});

// This controller for google map
app.controller("MapCtrl", function($scope, cartService) {
    var address = cartService.cart[1];
    $scope.map = {
        center: {
                latitude: address[0].latitude,
                longitude: address[0].longitude
        },
        zoom: 13
    };
    $scope.marker = {
        coords: {
            latitude: address[0].latitude,
            longitude: address[0].longitude
        },
           idKey: 1   
        }; 
});

app.controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.User = {};
    $scope.errorMessage = '';

    $scope.register = function() {
        $http.post('/signup', $scope.User)
        	.success(function(data) {
                $rootScope.$broadcast('user-logged-in');
                $location.path('/');
            }).error(function(err) {
                $scope.errorMessage = err;
            });
            $scope.isUserLoggedIn = true;
    }
});

app.controller('LoginCtrl', function ($rootScope, $scope, $http, $location, userService) {
    $scope.User = {};
    $scope.errorMessage = '';
    $scope.details = userService.UserDetail[0];

   	$scope.login = function() {
        $http.post('/login', $scope.User)
        	.success(function(data) {
                userService.UserDetail.push(data)
                $rootScope.$broadcast('user-logged-in');
                $location.path('/');
                // $route.reload();
            }).error(function(err) {
                $scope.errorMessage = err;
            });
         $scope.isUserLoggedIn = false;   
    };
});

app.controller('ProfileCtrl', function($scope, $http, $location, userService){
    console.log("This is from ProfileCtrl")
    console.log(userService.UserDetail)
     $scope.details = userService.UserDetail[1];
     
});

app.controller('NavCtrl', function($rootScope, $scope, $http, $location,userService,requestService){
    $scope.isUserLoggedIn = false;
    $scope.request = [];
    $scope.UserDetail = [];
    $scope.details = userService.UserDetail[1];

    $scope.$on('user-logged-in', function() {
        console.log("HEARD LOG IN EVENT");
        $scope.isUserLoggedIn = true;      
        $scope.details = userService.UserDetail[0];
    });

    $scope.$on('user-logged-out', function() {
        $scope.isUserLoggedIn = false;        
    });

    $scope.logout = function(){
        $rootScope.$broadcast('user-logged-out');
        $http.get('/auth/logout').success(function(data){
            $location.path('/');
        })
         userService.UserDetail = [];
    }

    $scope.getProfile = function(){
        $http.get("/profile/").success(function(data){  
            console.log("this from getprofile") 
            console.log(data)
            userService.UserDetail.push(data);
            $location.path('/profile');              
        })
    }
});










