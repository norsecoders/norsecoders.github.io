/**
 * 
 */
$(document).ready(function(){		

  var currentPosition = 0;
  var slideWidth = 560;
  var slides = $('.slide');
  var numberOfSlides = slides.length;
  
  $('.slide').each(function(){
	  numberOfSlides+=1;
  });

 alert(numberOfSlides);
  // Remove scrollbar in JS
  $('#slidesContainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  //debugger;
  slides
  .wrapAll('<div id="slideInner"></div>');
  $('#slideInner').css({
      'float' : 'left',
      'width' : slideWidth
    });
    // Float left to display horizontally, readjust .slides width

  //alert(numberOfSlides);
  // Set #slideInner width equal to total width of all slides
  $('#slideInner').css('width', slideWidth * numberOfSlides);
  
  // Insert controls in the DOM
  $('#slideshow')
    .prepend('<span class="control" id="leftControl">&laquo;</span>')
    .append('<span class="control" id="rightControl">&raquo;</span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.control')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;
    //alert(currentPosition);
	// Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInner').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){
		$('#leftControl').hide(); 

	} 
	else{ 
		$('#leftControl').show(); 
	}
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){ 
    	$('#rightControl').hide(); 
    } 
    else{ 
    	$('#rightControl').show(); 
    }
  }	

});
