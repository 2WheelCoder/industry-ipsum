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
			this.latin = false;

			var that = this;

			$.when( this.getTerms('js/startup-terms.json'), this.getTerms('js/ipsum-terms.json') ).done(function(startup, ipsum) {
				that.startupTerms = startup[0].terms;
				that.ipsumTerms = ipsum[0].terms;
				that.terms = that.startupTerms;
			});
		},

		capitalize: function(term) {
			return term.charAt(0).toUpperCase() + term.slice(1);
		},

		getTerms: function(url) {
			return $.ajax({
				type: 'GET',
				url: url
			});
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
			this.bindBreakpoints();
		},

		events: {
			'submit form': 'render',
			'change #p-count': 'updatePCount',
			'change #p-tags': 'togglePTags',
			'change #latin': 'toggleLatin',
			'click #socialLinks a' : 'share'
		},

		bindBreakpoints: function() {
			var $window = $(window),
				$creators = $('#creators'),
				$socialLinks = $('#socialLinks');

			$window.setBreakpoints({
				distinct: true,
				breakpoints: [
					960
				] 
			});     

			$window.bind('enterBreakpoint960', function() {
				$creators.insertBefore($socialLinks);
			});

			$window.bind('exitBreakpoint960', function() {
				$creators.insertAfter($socialLinks);
			});
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
			var imgNum = IpsumGenerator.getRandomNumber(1, 4),
				url = 'images/badge-' + imgNum + '.png';
			$('#logoBadge').attr('src', url);
		},

		share: function(evt) {
			evt.preventDefault();

			var url = evt.currentTarget.href;
			var newWindow = window.open(url,'name','height=440,width=540');
			if (window.focus) newWindow.focus();
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