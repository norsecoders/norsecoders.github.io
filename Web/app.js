var myApp = angular.module("myApp", ['ngRoute',]);
 
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'footer.html',
            controller: 'StudentController'
        })
        .when('/articles', {
        	templateUrl: 'articles.html',
        	controller: 'StudentController'
        })
        .when('/viewJournalists', {
            templateUrl: 'viewJournalists.html',
            controller: 'StudentController'
        })
         .when('/viewSlider', {
            templateUrl: 'img_slider.html',
            controller: 'StudentController'
        })
        .when('/oops', {
            templateUrl: 'oops.html',
            controller: 'StudentController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

myApp.controller('StudentController', function($scope, $http) {
    $http.post('http://localhost:8080/api/preferedJournalists', {username:'Nathan Lee', password:'norsecoders'})
        .success(function(data, status, headers, config) {
        	
        $scope.jList = data.journalistList;       
        $scope.jList2 = data.timeline;
        
        var j_List = [];
        for (var u=0; u<$scope.jList.length; u++) {
        	j_List.push(u);
        }
        $scope.listOfJournalists = j_List;
      
        var articles_list = [];
        for (var e=0; e < $scope.jList[0].articles.length; e++){
        	articles_list.push(e);
        }
        $scope.listOfArticles = articles_list;
        
        function j_img_fun(j_img){
        	for(var t=0; t<$scope.jList2.length; t++ ){ 
        		if ($scope.jList2[t].name == j_img){
        			return $scope.jList2[t].profile_image_url_https;
        		}
        	}

        	
        }
        	
        $scope.get_image = j_img_fun;
        
       /* function carousel_image_rotate(){ 
        	for (var u=0; u<$scope.jList.length; u++){ //length=3
        		for (var t=0; t<$scope.jList2.length; t++){ //length=20
        			if ($scope.jList2[t].name == $scope.jList[u].name){   //margin-left: 15px; transform: scale(2.5, 2.5);-ms-transform: scale(2.5, 2.5);-webkit-transform: scale(2.5, 2.5);
        				//$(".imgLiquidFill").append('<img alt="Woody" src="'+$scope.jList2[t].profile_image_url_https+'">');
        				$('#slidesContainer').append('<div class="slide"><h2>Following</h2><p><img src="'+$scope.jList2[t].profile_image_url_https+'"></p></div>');
        				//$(".imgLiquidFill").imgLiquid();
        				break;
        			}
        						
        		}
        				
        	}
                
        		
        		
        }
        $scope.car_img = carousel_image_rotate;8*/
        $scope.read_me = {};
        $scope.go_back = function() {
        	$('#artsy').hide();
        	$('#bottom-right').append('#ng-articles ul');
        }

        $scope.read = function(a){
        	$('#ng-articles ul').hide();
        	$('#ng-articles').append('<div id="artsy"><a href ng-click="go_back()" title="back"><span class="glyphicon glyphicon-circle-arrow-left"></span></a> <p>'+a+'</p></div>');
        }

    });
	
});
myApp.filter('checkmark', function() {
	
});