$(document).ready(function(){
  $('#loginForm').submit(function() {
    event.preventDefault();
    var loginArray = $(this).serializeArray();
    var loginJSON = '{"username":'+'"'+loginArray[0]['value']+'"'+',"password":'+'"'+loginArray[1]['value']+'"}'
    $.ajax({
      url:'/sp-backend1.0/api/login/',
      type:"POST",
      contentType:"application/json; charset=utf-8",
      data:loginJSON,
      dataType:"jsonp",
      success: function(){  
    	var user = loginArray[0]['value'];
        window.location.href = '/sp-backend1.0/success.html?username=' + user
      },
      error: function(){
    	 console.log('error block');
         window.location.href = '/sp-backend1.0/oops.html'
      }
    });
  });

  $('#signupForm').submit(function(){
    event.preventDefault();
    var signupArray = $(this).serializeArray();
    var signupJSON = '{"username":'+'"'+signupArray[0]['value']+'"'+',"password":'+'"'+signupArray[1]['value']+'"}'
    $.ajax({
      url:'/sp-backend1.0/api/newUser/',
      type:"POST",
      contentType:"application/json; charset=utf-8",
      data:signupJSON,
      dataType:"jsonp",
      success: function(){
        window.location.href = '/sp-backend1.0/success.html'
      },
      error: function(){
        window.location.href = '/sp-backend1.0/oops.html'
      }
    });    
  });
});
