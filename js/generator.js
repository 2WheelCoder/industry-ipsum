var Generator = function(startupJSONURL) {
	this.latinLibrary = new TermLibrary('js/lorem-ipsum.json').terms;
	this.startupLibrary = new TermLibrary(startupJSONURL).terms;
	this.terms = this.startupLibrary;
	
	this.options = {
		paragraphCount: 5,
		pTags: false
	};
};

Generator.prototype = {
	setUserOptions: function() {
		var pCount = $('#p-count').val();
		if ( pCount !== '' ) {
			this.options.paragraphCount = pCount;
		}

		if ( $('#latin:checkbox:checked').val() !== undefined ) {
			this.terms = this.startupLibrary.concat(this.latinLibrary);
		} else {
			this.terms = this.startupLibrary;
		}

		if ( $('#p-tags:checkbox:checked').val() !== undefined ) {
			this.options.pTags = true;
		}
	},

	generate: function() {
		var content = '<h2>Crushing it.</h2>';

		if ( this.options.pTags ) {
			content += '<pre><code>';
		}

		for (var x = 0; x < this.options.paragraphCount; x++) {
			content += this.options.pTags ? '&lt;p&gt;' : '<p>';

			var paragraph = new Paragraph(this.terms);
			content += paragraph.content;

			content += this.options.pTags ? '&lt;/p&gt;' : '</p>';
		}

		if ( this.options.pTags ) {
			content += '</pre></code>';
		}

		return content;
	},

	init: function() {
		var that = this,
			$generator = $('#generator');

		$generator.submit(function(evt) {
			evt.preventDefault();

			that.setUserOptions();

			var startupIpsumContent = that.generate();

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