var TermLibrary = function() {
	this.terms = null;
	this.getTerms();
};

TermLibrary.prototype = {
	getTerms: function() {
		var that = this;
		$.ajax({
			type: 'GET',
			async: false,
			url: 'js/startup-ipsum.json',
			success: function(data) {
				that.terms = data.startupTerms;
			}
		});
	}
};