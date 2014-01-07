var Generator = function(terms) {
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
		var that = this,
			$generator = $('#generator');

		$generator.submit(function(evt) {
			evt.preventDefault();

			var options = that.getUserOptions(),
				startupIpsumContent = that.generate();

			$('.intro-copy').fadeOut(function() {
				if( $('.startup-ipsum').length === 0 ) {
					$('.mainContent').prepend('<div class="startup-ipsum"></div>');
					$generator.children('button').html('Iterate!');
				}
				$('.startup-ipsum').html(startupIpsumContent);
			});
		});
	}
};