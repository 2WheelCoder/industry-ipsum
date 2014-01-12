var numRand = Math.floor(Math.random()*(1 - 0 + 1)) + 0;
document.getElementById("logoBadge").src = "images/badge-x2-"+numRand+".png";

jQuery(document).ready(function() {
	ipsumGenerator.init();
});

// TODO: Google Analytics