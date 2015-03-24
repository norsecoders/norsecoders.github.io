$("signupButton").click(function(){
  var send_data = new FormData();
  send_data.append("username", $('input[name=username]').val());
  send_data.append("password", $('input[name=password]').val());
  $.ajax({
    type: "POST",
    url: "127.0.0.1:8080/sp-backend1.0/newUser",
    dataType: "json",
    data: send_data,
    success: function(response){
      alert("reached success portion");
    }
  });
});
