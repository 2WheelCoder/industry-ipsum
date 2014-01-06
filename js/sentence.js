var Sentence = function() {
	this.latin = false;
	this.termCount = this.generateRandomNumber(7, 14);
	this.content = this.create();
};

Sentence.prototype = {
	create: function() {
		var content = '';

		for (var x = 0; x < this.termCount; x++) {
			term = $.terms[this.generateRandomNumber(0, $.terms.length - 1 )];

			if ( x === 0 ) {
				content += this.capitalize(term);
			} else {
				content += term;
			}

			if ( x !== this.termCount-1 ) {
				content += ' ';
			} else {
				content += '.';
			}
		}

		return content;
	},

	generateRandomNumber: function(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	},

	capitalize: function(term) {
		return term.charAt(0).toUpperCase() + term.slice(1);
	}
};