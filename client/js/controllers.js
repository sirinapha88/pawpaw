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
    // var descToSpit = getDesc(cartService.cart[0])
    $location.path('/Hotels');
    $scope.hotelDetail = [];
    // $scope.hotelDesc = descToSpit;
    
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
    console.log(detail)
    return detail;
}

// function getDesc(desc){
//      console.log(desc.length)
//     var detail;
//     for(var i = 0; i<desc.length; i++){
//          detail = desc[i].room_Rate.room_detail[0].desc.split(/[.,]+/);
//     }
//     return detail;
// }

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