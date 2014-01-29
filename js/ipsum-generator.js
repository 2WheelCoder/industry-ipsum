(function() {

window.IpsumGenerator = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};

window.getRandomNumber = function(min, max) {
	return Math.round(Math.random() * (max - min) + min);
};

IpsumGenerator.Models.Terms = Backbone.Model.extend({

	initialize: function() {
		this.startupTerms = this.getTerms('js/startup-terms.json');
		this.ipsumTerms = this.getTerms('js/ipsum-terms.json');
		this.terms = this.startupTerms;
		this.latin = false;
	},

	capitalize: function(term) {
		return term.charAt(0).toUpperCase() + term.slice(1);
	},

	getTerms: function(url) {
		var terms = [];

		$.ajax({
			type: 'GET',
			async: false,
			url: url,
			success: function(data) {
				terms = data.terms;
			}
		});

		return terms;
	},

	toggleLatin: function() {
		if (this.latin) {
			this.terms = this.startupTerms;
		} else {
			this.terms = this.startupTerms.concat(this.ipsumTerms);
		}
		this.latin = !this.latin;
	},

	getSentence: function() {
		var sentence = '',
			wordCount = getRandomNumber(7, 14);

		for (var x = 0; x < wordCount; x++) {
			term = this.terms[getRandomNumber(0, this.terms.length - 1 )];
			sentence += x === 0 ? this.capitalize(term) : term;
			sentence += x !== this.termCount-1 ? ' ' : '.';
		}

		return sentence;
	},

	getParagraph: function() {
		var p = '',
			sentenceCount = getRandomNumber(3, 5);

		for (var x = 0; x < sentenceCount; x++) {
			var sentence = this.getSentence();
			p += sentence;
			if ( x !== sentenceCount-1 ) p += ' ';
		}

		return p;
	}
});

IpsumGenerator.Views.IpsumText = Backbone.View.extend({
	latin: false,
	pTags: false,
	pCount: 5,
	content: '',
	el: '.mainContent',

	initialize: function() {
		this.termsModel = new IpsumGenerator.Models.Terms();
	},

	events: {
		'submit form': 'render',
		'change #p-count': 'updatePCount',
		'change #p-tags': 'togglePTags',
		'change #latin': 'toggleLatin'
	},

	generate: function() {
		var ipsum = '';

		for(var x = 0; x < this.pCount; x++) {
			if (this.pTags) {
				ipsum += '<code>&lt;p&gt;';
			} else {
				ipsum += '<p>';
			}

			ipsum += this.termsModel.getParagraph();

			if (this.pTags) {
				ipsum += '&lt;/p&gt;</code>';
			} else {
				ipsum += '</p>';
			}
		}
		return ipsum;
	},

	render: function(evt) {
		evt.preventDefault();
		
		var content = this.generate(),
			that = this;

		this.$el.find('.intro-copy').fadeOut(function() {
			if ( that.$el.find('.startup-ipsum').length === 0 ) {
				that.$el.prepend('<div class="startup-ipsum"></div>');
				that.$el.find('button').html('Iterate!');
			}
			$('.startup-ipsum').html(content);
		});

		return this;
	},

	toggleLatin: function() {
		this.termsModel.toggleLatin();
		this.latin = !this.latin;
	},

	togglePTags: function() {
		this.pTags = !this.pTags;
	},

	updatePCount: function() {
		this.pCount = this.$el.find('#p-count').val();
	}
});

var ipsumTextView = new IpsumGenerator.Views.IpsumText();

})();

// var ipsumGenerator = {
// latinLibrary: new TermLibrary('js/lorem-ipsum.json').terms,
// startupLibrary: new TermLibrary('js/startup-ipsum.json').terms,
// terms: this.startupLibrary,
// options: {
// paragraphCount: 5,
// pTags: false
// },

// setUserOptions: function() {
// var pCount = $('#p-count').val();
// if ( pCount > 99 ) {
// this.options.paragraphCount = 99;
// } else if ( pCount !== '' ) {
// this.options.paragraphCount = pCount;
// }

// if ( $('#latin:checkbox:checked').val() !== undefined ) {
// this.terms = this.startupLibrary.concat(this.latinLibrary);
// } else {
// this.terms = this.startupLibrary;
// }

// if ( $('#p-tags:checkbox:checked').val() !== undefined ) {
// this.options.pTags = true;
// } else {
// this.options.pTags = false;
// }
// },

// generate: function() {
// var content = '<h2>Crushing it.</h2>';

// for (var x = 0; x < this.options.paragraphCount; x++) {
// if ( this.options.pTags ) content += '<code>';

// content += this.options.pTags ? '&lt;p&gt;' : '<p>';

// var paragraph = new Paragraph(this.terms);
// content += paragraph.content;

// content += this.options.pTags ? '&lt;/p&gt;' : '</p>';

// if ( this.options.pTags ) content += '</code>';
// }

// return content;
// },

// init: function() {
// var that = this,
// $generator = $('#generator');

// $generator.submit(function(evt) {
// evt.preventDefault();

// that.setUserOptions();

// var startupIpsumContent = that.generate();

// $('.intro-copy').fadeOut(function() {
// if( $('.startup-ipsum').length === 0 ) {
// $('.mainContent').prepend('<div class="startup-ipsum"></div>');
// $generator.children('button').html('Iterate!');
// }
// $('.startup-ipsum').html(startupIpsumContent);
// });
// });
// }
// };