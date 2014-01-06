var Paragraph = function() {
	this.latin = false;
	this.sentenceCount = this.generateRandomNumber(3, 5);
	this.content = '';
	this.create();
};

Paragraph.prototype = {
	create: function() {
		for (var x = 0; x < this.sentenceCount; x++) {
			if ( x === 0 ) {
				this.content += '<p>';
			}
			var sentence = new Sentence();
			this.content += sentence.content;

			if ( x !== this.sentenceCount-1 ) {
				this.content += ' ';
			} else {
				this.content += '</p>';
			}
		}

		console.log(this.sentenceCount, this.content);
	},

	generateRandomNumber: function(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
};