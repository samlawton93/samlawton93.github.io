

(function ($) {

    "use strict";

	// JQUERY LIGHT BOX

	if ( $.isFunction($.fn.fluidbox) ) {
		$('a').fluidbox();
	}

	//ROUNDED TIMES COUNTDOWN

	if(isExists('#rounded-countdown')){
		var remainingSec = $('.countdown').data('remaining-sec');
		$('.countdown').ClassyCountdown({
			theme: "flat-colors-very-wide",
			end: $.now() + remainingSec
		});
	}

	//NORMAL TIMES COUNTDOWN

	if(isExists('#normal-countdown')){
		var date = $('#normal-countdown').data('date');
		$('#normal-countdown').countdown(date, function(event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><h3 class="main-time">%D</h3> <span>Days</span></div>'
				+ '<div class="time-sec"><h3 class="main-time">%H</h3> <span>Hours</span></div>'
				+ '<div class="time-sec"><h3 class="main-time">%M</h3> <span>Mins</span></div>'
				+ '<div class="time-sec"><h3 class="main-time">%S</h3> <span>Sec</span></div>'));
		});
	}


	$('a[href="#"]').on('click', function(event){
		return;
	});

	// COUNTDOWN TIME

	countdownTime();


	$('[data-nav-menu]').on('click', function(event){

		var $this = $(this),
			visibleHeadArea = $this.data('nav-menu');

		$(visibleHeadArea).toggleClass('visible');

	});


	var winWidth = $(window).width();
	dropdownMenu(winWidth);

	$(window).on('resize', function(){
		dropdownMenu(winWidth);

	});

	// Circular Progress Bar

	var isAnimated = false;


})(jQuery);



function countdownTime(){

	if(isExists('#clock')){
		$('#clock').countdown('2018/01/01', function(event){
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-sec"><span class="title">%D</span> days </div>'
				+ '<div class="time-sec"><span class="title">%H</span> hours </div>'
				+ '<div class="time-sec"><span class="title">%M</span> minutes </div>'
				+ '<div class="time-sec"><span class="title">%S</span> seconds </div>'));
		});
	}
}
function dropdownMenu(winWidth){

	if(winWidth > 767){

		$('.main-menu li.drop-down').on('mouseover', function(){
			var $this = $(this),
				menuAnchor = $this.children('a');

			menuAnchor.addClass('mouseover');

		}).on('mouseleave', function(){
			var $this = $(this),
				menuAnchor = $this.children('a');

			menuAnchor.removeClass('mouseover');
		});

	}else{

		$('.main-menu li.drop-down > a').on('click', function(){

			if($(this).attr('href') == '#') return false;
			if($(this).hasClass('mouseover')){ $(this).removeClass('mouseover'); }
			else{ $(this).addClass('mouseover'); }
			return false;
		});
	}

}

function isExists(elem){
	if ($(elem).length > 0) {
		return true;
	}
	return false;
}

$("#email-form").on("submit", function(e) {
	e.preventDefault();

	var email  = $("#email-form-email"),
	    submit = $("#email-form-submit");

	return email.val() ? $.ajax({
		method: "post",
		url: "/forms/email-submit.php",
		data: $(this).serialize(),
		dataType: "json"
	}).done(function(e) {
		e.error ? alert(e.error) : $(".email-input-area").html(e);
	}).fail(function() {
		alert("AJAX error")
	}) : alert("Please enter an email address before submitting");
});
