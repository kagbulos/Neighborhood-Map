//array that holds all the data to be used in the project
var initialPlaces = [
    {
        name:'Blondies Pizza',
        x: 37.868235,
        y: -122.259306,
        address: '2340 Telegraph Ave, Berkeley',
        pictureDescription: 'Blondies Pizza in Berkeley',
        uiDescription: 'My very first pizza place'
    },
    {
        name:'Pieology',
        x: 37.865660,
        y: -122.258582,
        address: '2468 Telegraph Ave, Berkeley',
        pictureDescription: 'Pieology Custom Pizza',
        uiDescription: 'Custom pizzas = YUM'
    },
    {
        name:'Thai Basil',
        x: 37.868407,
        y: -122.258168,
        address: '2519F Durant Ave, Berkeley',
        pictureDescription: 'Thai Basil Berkeley',
        uiDescription: 'My go to Thai place'
    },
    {
        name:'Jupiters',
        x: 37.869841,
        y: -122.267666,
        address: '2181 Shattuck Ave,Berkeley',
        pictureDescription: 'Jupiters in Berkeley',
        uiDescription: 'No better place to go with a group of friends'
    },
    {
        name:'Chipotle',
        x: 37.868368,
        y: -122.259009,
        address: '2311 Telegraph Ave, Berkeley',
        pictureDescription: 'Chipotle Mexican food Berkeley',
        uiDescription: 'A staple for any college kid'
    },
    {
        name:'Chez Panisse',
        x: 37.880370,
        y: -122.268869,
        address: '1517 Shattuck Ave, Berkeley',
        pictureDescription: 'Chez Panisse',
        uiDescription: "It's famous in Berkeley for a good reason"
    },
    {
        name:'Build Pizzeria Roma',
        x: 37.867667,
        y: -122.268106,
        address: '2286 Shattuck Ave, Berkeley',
        pictureDescription: 'Build Pizza Berkeley',
        uiDescription: "So... I really like pizza"
    },
    {
        name:'Cheese Board Pizza',
        x: 37.879859,
        y: -122.269490,
        address: '1512 Shattuck Ave, Berkeley',
        pictureDescription: 'Cheese Board Pizza Berkeley',
        uiDescription: "It's a tradition that every freshmen goes here once"
    },
    {
        name:"Phil's Sliders",
        x: 37.871479,
        y: -122.268545,
        address: '2024 Shattuck Ave, Berkeley',
        pictureDescription: "Phil's Sliders Berkeley",
        uiDescription: "One of the best snacks to get between classes"
    },
    {
        name:"La Val's",
        x: 37.875486,
        y: -122.260390,
        address: '1834 Euclid Ave, Berkeley',
        pictureDescription: "La Val's Pizza",
        uiDescription: "Italian food :)"
    }
]

var Place = function(data)
{
    this.location = ko.observable(data.location);
    this.name = ko.observable(data.name);
    this.shouldShowPlace = ko.observable(true);
    this.address = ko.observable(data.address);
    this.pictureDescription = ko.observable(data.pictureDescription);
    this.shouldShowDescription = ko.observable(true);
    this.shouldShowPlacePicture = ko.observable(true);
    this.uiDescription = ko.observable(data.uiDescription);
    this.x = ko.observable(data.x);
    this.y = ko.observable(data.y);
    this.picUrl = ko.observable('http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + data.address + '');
}

var ViewModel = function()
{
	var self = this;
	//word that the user will type in that will determine which items stay in the list or not
	self.filterWords = ko.observable();
	//this section populates our list with all the place objects containing all their attributes
	self.placesList = ko.observableArray([]);
	initialPlaces.forEach(function(placeItem)
    {
	   self.placesList.push(new Place(placeItem));
	});
    //responsible for functionality when the user clicks search
	self.filterList = function() {
		//go through each item, see if it matches the filter word, and if it doesnt, get rid of it!
		//we have toLowerCase because we want to make it case insensitive
		for (var i = 0; i < self.placesList().length ; i++)
    	{
    	 	if (!(self.placesList()[i].name().toLowerCase().search(self.filterWords().toLowerCase()) > -1))
    	 	{
    	 		self.placesList()[i].shouldShowPlace(false);
                self.placesList()[i].shouldShowDescription(false);
                self.placesList()[i].shouldShowPlacePicture(false);
                //when the words disapper, so must their markers
                markers[i].setMap(null);
    	 	};
    	}
    };
    //responsible for functionality when the user clicks clear
    self.clearFilter = function()
    {
    	//clearing the filter means we show everything again
    	for (var i = 0; i < self.placesList().length ; i++)
    	{
    	 	self.placesList()[i].shouldShowPlace(true);
            self.placesList()[i].shouldShowDescription(true);
            self.placesList()[i].shouldShowPlacePicture(true);
    	}
    	//reset the value of the text box
    	self.filterWords("");
        //since we are clearing our filters, we make sure that we show every marker
        for (var i = 0; i < markers.length; i++)
        {
            markers[i].setMap(map);
        };
        //clear the pictures that were generated from flickr
        var $flickrPicRow1Elem = $('#flickr-picture-row1');
        var $flickrPicRow2Elem = $('#flickr-picture-row2');
        $flickrPicRow1Elem.empty();
        $flickrPicRow2Elem.empty();
        //show the map again
        self.showMap();
    };
    //resposible for displaying the pictures using the flickr api
    self.displayFlickr = function(clickedRestaurant)
    {
        //grab the two rows of pictures and clear them so we can add new pictures for the selected place
        var $flickrPicRow1Elem = $('#flickr-picture-row1');
        var $flickrPicRow2Elem = $('#flickr-picture-row2');
        $flickrPicRow1Elem.empty();
        $flickrPicRow2Elem.empty();
        var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=31953374b94d3469c7570fec2c3acc67&text=' + clickedRestaurant.pictureDescription() +'&format=json&nojsoncallback=1';
        $.getJSON(flickrUrl, function(data)
        {
            //appened 2 pictures to the top row
            for(var i = 0; i < 2; i++)
            {
                var id = data.photos.photo[i].id;
                var farmid = data.photos.photo[i].farm;
                var serverid = data.photos.photo[i].server;
                var secret = data.photos.photo[i].secret;
                $flickrPicRow1Elem.append('<img id = "flickr-img" src="https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg"/ alt= "flickrimg">');
            };
            //append 2 pictures to the bottom row
            for(var i = 2; i < 4; i++)
            {
                var id = data.photos.photo[i].id;
                var farmid = data.photos.photo[i].farm;
                var serverid = data.photos.photo[i].server;
                var secret = data.photos.photo[i].secret;
                $flickrPicRow2Elem.append('<img id = "flickr-img" src="https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg"/ alt= "flickrimg">');
            };
        });
    };
    //since a click event can't have 2 events happen, we put them into one function that calls both of them
    self.displayBoth = function(clickedRestaurant)
    {
        //get rid of the map and then show the flickr collage
        self.clearMap();
        self.displayFlickr(clickedRestaurant);
    };
    //responsible for getting rid of the map
    self.clearMap = function()
    {
        $('#map-canvas').hide();
    }
    //responsible for showing the map
    self.showMap = function()
    {
        $('#map-canvas').show();
    }
    //all that follows is used for generating the google map with markers
    var mapCanvas;
    var mapOptions;
    var map;
    var markers=[];
    //section of code that loads the google map!
    function initialize()
    {
        //make the map
        mapCanvas = document.getElementById('map-canvas');
        mapOptions = {
            center: new google.maps.LatLng(37.871865, -122.258628),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(mapCanvas, mapOptions);
        //section of code that will add all the markers to the map!
        for (var i = 0; i < self.placesList().length ; i++)
        {
            //create a marker for every location in our placesList and then put it on the map
            var myLatlng = new google.maps.LatLng(self.placesList()[i].x(),self.placesList()[i].y());
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title: self.placesList()[i].name()
            });
            //NOTE: the following section uses the trick used in Javascript design patterns -> Changing expectations -> Closures and Event Listeners
            //stores the name of the restaurant in a variable
            var tempname = self.placesList()[i];
            //section to add the display flickr functionality to each marker
            google.maps.event.addListener(marker, 'click', (function(tempnameCopy)
            {
                return function()
                {
                    self.clearMap();
                    var $flickrPicRow1Elem = $('#flickr-picture-row1');
                    var $flickrPicRow2Elem = $('#flickr-picture-row2');
                    $flickrPicRow1Elem.empty();
                    $flickrPicRow2Elem.empty();
                    var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=31953374b94d3469c7570fec2c3acc67&text=' + tempnameCopy.pictureDescription() +'&format=json&nojsoncallback=1';
                    $.getJSON(flickrUrl, function(data)
                    {
                        //appened 2 pictures to the top row
                        for(var i = 0; i < 2; i++)
                        {
                            var id = data.photos.photo[i].id;
                            var farmid = data.photos.photo[i].farm;
                            var serverid = data.photos.photo[i].server;
                            var secret = data.photos.photo[i].secret;
                            $flickrPicRow1Elem.append('<img id = "flickr-img" src="https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg"/ alt= "flickrimg">');
                        };
                        //append 2 pictures to the bottom row
                        for(var i = 2; i < 4; i++)
                        {
                            var id = data.photos.photo[i].id;
                            var farmid = data.photos.photo[i].farm;
                            var serverid = data.photos.photo[i].server;
                            var secret = data.photos.photo[i].secret;
                            $flickrPicRow2Elem.append('<img id = "flickr-img" src="https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg"/ alt= "flickrimg">');
                        };
                    });
                }
            }) (tempname));
            //add all the marker(s) to the markers array
            markers.push(marker);
        }
    }
    //error handling for google maps api
    try
    {
        google.maps.event.addDomListener(window, 'load', initialize);
    }
    catch (error)
    {
        alert("Unfortunately, the information on this page cannot be loaded");
        console.log("Something went wrong: ", error);
    }
}
//aply by data-bindings we made
ko.applyBindings(new ViewModel());