(function($) {
	$.termLibrary = new TermLibrary();
	$.terms = $.termLibrary.terms;

	$(document).ready(function() {
		var generator = new Generator();
		generator.init();
	});
})(jQuery);