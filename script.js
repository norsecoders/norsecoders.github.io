$(document).ready(function(){
  $('#loginForm').submit(function() {
    event.preventDefault();
    var loginArray = $(this).serializeArray();
    var loginDict = $.map(loginArray, function(n,i){
      return {Key: n.name, Value: $(n).val()};
    });
    console.log(loginDict);
  });

  $('#signupForm').submit(function(){
    event.preventDefault();
    var signupArray = $(this).serializeArray();
    var signupJSON = '{"username":'+'"'+signupArray[0]['value']+'"'+',"password":'+'"'+signupArray[1]['value']+'"}'
    console.log(signupJSON);
    $.ajax({
      url:'http://127.0.0.1:8080/sp-backend1.0/newUser',
      type:"POST",
      headers: { 
        "Accept" : "application/json; charset=utf-8"
      },
      contentType:"application/json; charset=utf-8",
      data:signupJSON,
      dataType:"json"
  });
});
