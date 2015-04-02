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
    console.log(signupArray[0]);
  });
});
