// This service for all the hotels list that will display in Hotels.htmls
app.service('cartService', function(){
  	return {
    	cart: []
  	};
});
// This service from the form that user's looking for hotel.
app.service('requestService', function(){
    return {
      request: []
    };
});

app.service('userService',function(){
  return{
    UserDetail:[],
    currentUser:{},
    bookings: []
  }
});

app.service('loginService', function ($location,$http) {
        
        if (null != username && 0 != username.length && 
            null != password && 0 != password.length) {
            $scope.signedin = true;
        } else {
            $scope.signedin = false;
        }   
});

