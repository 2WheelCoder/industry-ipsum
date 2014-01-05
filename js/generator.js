var Generator = function() {
	this.options = {
		paragraphCount: 5,
		latin: false,
		pTags: false
	};
};

Generator.prototype = {
	getUserOptions: function() {
		var pCount = $('#p-count').val();
		if ( pCount !== '' ) {
			this.options.paragraphCount = pCount;
		}

		if ( $('#latin:checkbox:checked').val() !== undefined ) {
			this.options.latin = true;
		}

		if ( $('#p-tags:checkbox:checked').val() !== undefined ) {
			this.options.pTags = true;
		}
	},

	generate: function() {
		var content = '';

		for (var x = 0; x < this.options.paragraphCount; x++) {
			var paragraph = new Paragraph();
			content += paragraph.content;
		}

		return content;
	},

	init: function() {
		var that = this;
		$('#generator').submit(function(evt) {
			evt.preventDefault();

			var options = that.getUserOptions(),
				startupIpsum = that.generate();

			$('.intro-copy').fadeOut(function() {
				$('.mainContent').prepend('<div class="startup-ipsum"></div>');
				$('.startup-ipsum').html(startupIpsum);	
			});
		});
	}
};