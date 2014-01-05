var Generator = function() {
	this.options = {
		paragraphCount: 5,
		latin: false,
		pTags: false
	};

	// listen for click of 'generate'

	// get user input for number of paragraphs and latin

	// insert paragraphs into page
};

Generator.prototype = {
	getUserOptions: function() {
		this.options.paragraphCount = $('#paragraph-count').val();
		this.options.latin = $('#latin:checkbox:checked').val();
		this.options.pTags = $('#p-tags:checkbox:checked').val();
	},
	generate: function() {

	},
	init: function() {
		var that = this;
		$('#generator').submit(function(evt) {
			evt.preventDefault();

			var options = that.getUserOptions(),
				startupIpsum = that.generate();
			$('#main-content').prepend(startupIpsum);
		});
	}
};