var numRand = Math.floor(Math.random()*(1 - 0 + 1)) + 0;
document.getElementById("logoBadge").src = "images/badge-x2-"+numRand+".png";

jQuery(document).ready(function() {
	var generator = new Generator('js/startup-ipsum.json');
	generator.init();
});

// TODO: Set max number of paragraphs
// TODO: Google Analytics