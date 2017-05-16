var modal = {
	currentCat : null,
	cats : [{
		clicked : 0,
		name: "pessy",
		pic : "img/cat.jpg"
	},
	{
		clicked : 0,
		name: "Lillo",
		pic : "img/cat2.jpg"
	},
	{
		clicked : 0,
		name: "snow",
		pic: "img/cat3.jpg"
	}
	]
};

var octopus = {
	init: function() {
		// set our cat to the 1st one
		modal.currentCat = modal.cats[0];
		catListView.init();
		catView.init();
	},
	geCurrentCat: function() {
		return modal.currentCat;
	},
	getCats: function() {
		return modal.cats;
	},
	// set the currently-selected cat to the object passed in
	setCurrentCat: function(cat) {
		modal.currentCat = cat;
	},
	incrementCounter: function() {
		modal.currentCat.clicked++;
		catView.render();
	}
};
// view1
var catView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('name');
		this.catImageElem = document.getElementById('img');
		this.countElem = document.getElementById('counter');

		// on click, increment the current cat's counter
		this.catImageElem.addEventListener('click', function() {
			octopus.incrementCounter();
		});

		 // render this view (update the DOM elements with the right values)
		 this.render();

	},
	render: function() {
		// update the DOM elements with values from the current cat
		var currentCat = octopus.geCurrentCat();
		this.countElem.textContent = currentCat.clicked;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.pic;
	}
};
// view2
var catListView = {
	init : function() {
		// store the DOM element for easy access later
		this.catListElem = document.getElementById('catsList');
		// render this view (update the DOM elements with the right values)
		this.render();
	},
	render: function() {
		var cat, elem;
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = '';

		// loop over the cats
		for (var i=0; i<cats.length; i++) {
			// this is the cat we're currently looping over
			cat = cats[i];
			// make a new cat list item and set its text
			elem = document.createElement('li');
			elem.textContent = cat.name;
			 // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(cat) {
            	return function () {
            		octopus.setCurrentCat(cat);
            		catView.render();
            	};
            })(cat));
            // finally, add the element to the list
            this.catListElem.appendChild(elem);
		}
	}
};
// make it go!
octopus.init();
