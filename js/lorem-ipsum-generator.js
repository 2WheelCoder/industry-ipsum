(function($) {
	$.termLibrary = new TermLibrary();
	$.terms = $.termLibrary.terms;

	$(document).ready(function() {
		var generator = new Generator();
		generator.init();
	});
})(jQuery);

// TODO: Enable iterate
// TODO: Offer latin option
// TODO: Add P tags option
// TODO: Rotate header images