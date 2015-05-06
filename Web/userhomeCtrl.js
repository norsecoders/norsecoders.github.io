var app = angular.module('myApp', ['ngRoute']);

    app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
      templateUrl : '#';//'http://localhost:11080/sp-backend1.0/index.html',
     // controller  : 'hello'
            })
      .when('/index', {
        templateUrl: '#';//'/front_end_2_0/senior-project-site/index.html',
       // controller: 'indexCtrl'
      })
      .when('/aboutus', {
        templateUrl: '#';//'/front_end_2_0/senior-project-site/aboutus.html',
        //controller: 'aboutusCtrl'
      }).
      otherwise({
        redirectTo: '#'
      });
  }]);

 /*   app.controller('hello', function ($scope, $http) {
$http.get('http://localhost:11080/sp-backend1.0/getJournalist').success(function(data, status, headers, config) {
        $scope.greeting = data;
        $scope.dates = data.articles;
       // $scope.list = [];
       /* for (int i ==0; i<=data.length; i++){
            $scope.list.push(i+1);
        }*---
        $scope.list = [1,2,3,4,5,6,7,8,9,10];
        $('.a_date').hide();
        $('.a_name').hide();
        $('.a_text').hide();

        //console.log(myObj.)
        //alert(data);


    });/*.
error(function(data, status, headers, config){
    //
});*
});*/

myApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});


    scotchApp.controller('aboutusCtrl', function($scope) {
    $scope.message = 'Look! I am an about page.';
});
/*
scotchApp.controller('indexCtrl', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
*/








