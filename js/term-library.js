function TermLibrary(jsonURL) {
	this.jsonURL = jsonURL;
	this.terms = this.getTerms();
}

TermLibrary.prototype = {
	getTerms: function() {
		var that = this,
			terms = [];

		$.ajax({
			type: 'GET',
			async: false,
			url: that.jsonURL,
			success: function(data) {
				terms = data.terms;
			}
		});

		return terms;
	}
};