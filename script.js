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
    var signupDict = {}
    for (i = 0; i < signupArray.length; i++){
      signupDict['username'] = signupArray[0]['value'];
      signupDict['password'] = signupArray[1]['value'];
    }
    console.log(signupDict);
  });
});
