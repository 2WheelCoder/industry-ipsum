var Paragraph = function() {
	this.latin = false;
	this.sentenceCount = this.generateRandomNumber(3, 5);
	this.content = this.create();
};

Paragraph.prototype = {
	create: function() {
		var content = '';

		for (var x = 0; x < this.sentenceCount; x++) {
			if ( x === 0 ) {
				content += '<p>';
			}
			var sentence = new Sentence();
			content += sentence.content;

			if ( x !== this.sentenceCount-1 ) {
				content += ' ';
			} else {
				content += '</p>';
			}
		}

		console.log(content);

		return content;
	},

	generateRandomNumber: function(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
};