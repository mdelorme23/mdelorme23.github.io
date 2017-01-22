$(function() {
	$('.sections > span').click(function(){
		if(!$(this).hasClass('active')){
			$('.sections > span').removeClass("active");
			$(this).addClass('active');
			$('.contained1').toggle();
		}
	});
});