$(document).ready(function() {
	if ($(window).width() > 700) {
		$('.aboutUs .spacer').addClass('active')
	} else {
		$('aboutus .spacer').addClass('inactive')
	}
});

(function($) {
    $(window).resize(function resize(){
        if ($(window).width() > 700) {
            return $('.aboutUs .spacer').removeClass('inactive').addClass('active');
        }

        $('.aboutUs .spacer').removeClass('active').addClass('inactive');
    }).trigger('resize');
})(jQuery);
