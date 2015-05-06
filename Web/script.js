$(document).ready(function(){
 /* $(function() {
	$( "#accordion" ).accordion();
  });*/

  $('#loginForm').submit(function() {
    event.preventDefault();
    var loginArray = $(this).serializeArray();
    var loginJSON = '{"username":'+'"'+loginArray[0]['value']+'"'+',"password":'+'"'+loginArray[1]['value']+'"}'
    $.ajax({
      url:'/api/login/',
      type:"POST",
      contentType:"application/json; charset=utf-8",
      data:loginJSON,
      dataType:"json",
      success: function(){  
    	var user = loginArray[0]['value'];
    	var pw = loginArray[1]['value'];
        window.location.href = '/user_home.html?username=' + user + '&session=' + pw
      },
      error: function(){
    	 console.log('error block');
         window.location.href = '/oops.html'
      }
    });
  });

  $('#signupForm').submit(function(){
    event.preventDefault();
    var signupArray = $(this).serializeArray();
    var signupJSON = '{"username":'+'"'+signupArray[0]['value']+'"'+',"password":'+'"'+signupArray[1]['value']+'"}'
    $.ajax({
      url:'/api/newUser/',
      type:"POST",
      contentType:"application/json; charset=utf-8",
      data:signupJSON,
      dataType:"json",
      success: function(){
        window.location.href = '/success.html'
      },
      error: function(){
        window.location.href = '/oops.html'
      }
    });    
  });
});
