var Paragraph = function(terms) {
	this.terms = terms;
	this.sentenceCount = this.generateRandomNumber(3, 5);
	this.content = this.create();
};

Paragraph.prototype = {
	create: function() {
		var content = '';

		for (var x = 0; x < this.sentenceCount; x++) {
			var sentence = new Sentence(this.terms);
			content += sentence.content;
			if ( x !== this.sentenceCount-1 ) content += ' ';
		}

		return content;
	},

	generateRandomNumber: function(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
};