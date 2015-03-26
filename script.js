$('div.aboutUs > div#main1 > div').submit(function(event){
  event.preventDefault();
  var $form = $(this),
    url = $form.attr('action');
    var posting = $.post( url, {username: $('#username').val(), password: $('#password').val()});
    posting.done(function(data){
      alert('success');
    });
});
