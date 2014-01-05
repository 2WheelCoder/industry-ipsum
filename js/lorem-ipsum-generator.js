(function($) {
// 2 json files: startup ipsum and latin

	var latin = false;

	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function fetchWord() {
		return fixie_wordlibrary[constrain(0, fixie_wordlibrary.length - 1 )];
	}

	function constrain(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	function fixie_fetch(min, max, func, join) {
		// join || (join = ' ');
		var fixie_length = constrain(min, max);
		var result = [];
		for (var fixie_i = 0; fixie_i < fixie_length; fixie_i++) {
			result.push(func());
		}

		return fixie_capitalize(result.join(join));
	}

	var createParagraph = function() {
		var paragraph,
			sentence = createSentence();

		return paragraph;
	};

	var generateIpsum = function(paragraphLength) {
		var paragraphs;

		while(paragraphsLength > 0) {
			paragraphs += createParagraph();

			paragraphsLength--;
		}
	};

	// create a paragraph
		// create 3-5 sentences
			// select random words from ipsum (or latin)
			// capitalize first letter in a sentence
			// limit sentences to 11-17 words
			// add period and space to end

	// display paragraphs same page

	$(document).ready(function() {
		$('#generate').click(function(evt) {
			evt.preventDefault();

			// get number of paragraphs from text box
			var paragraphLength = $('#paragraphs').val();

			latin = $('#latin:checkbox:checked').val();
			
			// get neat or latin

			generateIpsum(paragraphLength);
		});
	});

})(jQuery);