var collection = document.getElementsByClassName('block');

// Get the element, add a click listener...
document.getElementById("myBtn").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "myBtn") {
		// List item found!  Output the ID!
		console.log(document.getElementsByClassName('block').id);
	}
});