(function() {

window.IpsumGenerator = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};

})();

// var ipsumGenerator = {
// 	latinLibrary: new TermLibrary('js/lorem-ipsum.json').terms,
// 	startupLibrary: new TermLibrary('js/startup-ipsum.json').terms,
// 	terms: this.startupLibrary,
// 	options: {
// 		paragraphCount: 5,
// 		pTags: false
// 	},

// 	setUserOptions: function() {
// 		var pCount = $('#p-count').val();
// 		if ( pCount > 99 ) {
// 			this.options.paragraphCount = 99;
// 		} else if ( pCount !== '' ) {
// 			this.options.paragraphCount = pCount;
// 		}

// 		if ( $('#latin:checkbox:checked').val() !== undefined ) {
// 			this.terms = this.startupLibrary.concat(this.latinLibrary);
// 		} else {
// 			this.terms = this.startupLibrary;
// 		}

// 		if ( $('#p-tags:checkbox:checked').val() !== undefined ) {
// 			this.options.pTags = true;
// 		} else {
// 			this.options.pTags = false;
// 		}
// 	},

// 	generate: function() {
// 		var content = '<h2>Crushing it.</h2>';

// 		for (var x = 0; x < this.options.paragraphCount; x++) {
// 			if ( this.options.pTags ) content += '<code>';

// 			content += this.options.pTags ? '&lt;p&gt;' : '<p>';

// 			var paragraph = new Paragraph(this.terms);
// 			content += paragraph.content;

// 			content += this.options.pTags ? '&lt;/p&gt;' : '</p>';

// 			if ( this.options.pTags ) content += '</code>';
// 		}

// 		return content;
// 	},

// 	init: function() {
// 		var that = this,
// 			$generator = $('#generator');

// 		$generator.submit(function(evt) {
// 			evt.preventDefault();

// 			that.setUserOptions();

// 			var startupIpsumContent = that.generate();

// 			$('.intro-copy').fadeOut(function() {
// 				if( $('.startup-ipsum').length === 0 ) {
// 					$('.mainContent').prepend('<div class="startup-ipsum"></div>');
// 					$generator.children('button').html('Iterate!');
// 				}
// 				$('.startup-ipsum').html(startupIpsumContent);
// 			});
// 		});
// 	}
// };