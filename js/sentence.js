function Sentence(terms) {
	this.terms = terms;
	this.termCount = this.generateRandomNumber(7, 14);
	this.content = this.create();
}

Sentence.prototype = {
	create: function() {
		var content = '';

		for (var x = 0; x < this.termCount; x++) {
			term = this.terms[this.generateRandomNumber(0, this.terms.length - 1 )];
			content += x === 0 ? this.capitalize(term) : term;
			content += x !== this.termCount-1 ? ' ' : '.';
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