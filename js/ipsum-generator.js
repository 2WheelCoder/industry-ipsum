(function() {

	window.IpsumGenerator = {
		Models: {},
		Collections: {},
		Views: {},
		getRandomNumber: function(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		}
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
				wordCount = IpsumGenerator.getRandomNumber(7, 14);

			for (var x = 0; x < wordCount; x++) {
				term = this.terms[IpsumGenerator.getRandomNumber(0, this.terms.length - 1 )];
				sentence += x === 0 ? this.capitalize(term) : term;
				sentence += x !== this.termCount-1 ? ' ' : '.';
			}

			return sentence;
		},

		getParagraph: function() {
			var p = '',
				sentenceCount = IpsumGenerator.getRandomNumber(3, 5);

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
		el: 'body',

		initialize: function() {
			this.termsModel = new IpsumGenerator.Models.Terms();
			this.renderHeaderIcon();
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
					that.$el.children('.mainContent').prepend('<div class="startup-ipsum"></div>');
					that.$el.find('button').html('Iterate!');
				}
				$('.startup-ipsum').html(content);
			});

			return this;
		},

		renderHeaderIcon: function() {
			var imgNum = IpsumGenerator.getRandomNumber(0, 1),
				url = 'images/badge-x2-' + imgNum + '.png';
			$('#logoBadge').attr('src', url);
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