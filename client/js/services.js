app.service('cartService', function(){
  	return {
    	cart: []
  	};
});

app.service('loginService', function ($location,$http) {
        
        if (null != username && 0 != username.length && 
                     null != password &&  0 != password.length) {
            $scope.signedin = true;
        } else {
            $scope.signedin = false;
        }
    };
});