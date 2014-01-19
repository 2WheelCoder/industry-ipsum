var numRand = Math.floor(Math.random()*(1 - 0 + 1)) + 0;
document.getElementById("logoBadge").src = "images/badge-x2-"+numRand+".png";

jQuery(document).ready(function() {
	var $window = $(window),
		$creators = $('#creators'),
		$socialLinks = $('#socialLinks');

	ipsumGenerator.init();

	$window.setBreakpoints({
		distinct: true,
		breakpoints: [
			960
		] 
	});     

	$window.bind('enterBreakpoint960', function() {
		console.log('enter');
		$creators.insertBefore($socialLinks);
	});

	$window.bind('exitBreakpoint960', function() {
		console.log('exit');
		$creators.insertAfter($socialLinks);
	});
});

// TODO: Google Analytics