$('.tabs li').on('click', function(){
	$('.showcase, .tabs').children('.active').removeClass('active');
	var clickedClass = $(this).attr("class");
	$(this).addClass('active');
	$('.showcase').addClass('active');
});