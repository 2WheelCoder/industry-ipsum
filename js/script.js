jQuery(document).ready(function() {
	var $window = $(window),
		$creators = $('#creators'),
		$socialLinks = $('#socialLinks');

	// ipsumGenerator.init();

	$window.setBreakpoints({
		distinct: true,
		breakpoints: [
			960
		] 
	});     

	$window.bind('enterBreakpoint960', function() {
		$creators.insertBefore($socialLinks);
	});

	$window.bind('exitBreakpoint960', function() {
		$creators.insertAfter($socialLinks);
	});
});