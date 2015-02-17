$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
    $('nav .container-fluid').addClass('shrink');
    $('nav .container-fluid form').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
    $('nav .container-fluid').removeClass('shrink');
    $('nav .container-fluid form').removeClass('shrink');
  }
});