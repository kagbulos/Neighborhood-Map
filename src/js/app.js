//enable strict mode
"use strict";
//all that follows is used for generating the google map with markers
var map;
var markers=[];
var infowindowarr = [];
var infowindow;
try
{
    infowindow = new google.maps.InfoWindow();
}
catch (error)
{
    alert("Unfortunately, the information on this page cannot be loaded z");
    console.log("Something went wrong: ", error);
}
//array that holds all the data to be used in the project
var initialPlaces = [
    {
        name: 'Blondies Pizza',
        x: 37.868235,
        y: -122.259306,
        address: '2340 Telegraph Ave, Berkeley',
        pictureDescription: 'Blondies Pizza in Berkeley',
        uiDescription: 'My very first pizza place',
        telephone: 'Number: (510) 548-1129',
        website: 'Website: blondiespizza.com',
        money: '$: $',
        uiAddress: 'Address: 2340 Telegraph Ave, Berkeley',
        rating: 'Rating: 3.6'
    },
    {
        name: 'Pieology',
        x: 37.865660,
        y: -122.258582,
        address: '2468 Telegraph Ave, Berkeley',
        pictureDescription: 'Pieology Custom Pizza',
        uiDescription: 'Custom pizzas = YUM',
        telephone: 'Number: (510) 649-0600',
        website: 'Website: pieology.com',
        money: '$: $',
        uiAddress: 'Address: 2468 Telegraph Ave, Berkeley',
        rating: 'Rating: 4.2'
    },
    {
        name: 'Thai Basil',
        x: 37.868407,
        y: -122.258168,
        address: '2519F Durant Ave, Berkeley',
        pictureDescription: 'Thai Basil Berkeley',
        uiDescription: 'My go to Thai place',
        telephone: 'Number: (510) 548-6692',
        website: 'Website: N/a',
        money: '$: $',
        uiAddress: 'Address: 2519F Durant Ave, Berkeley',
        rating: 'Rating: 4.2'
    },
    {
        name: 'Jupiters',
        x: 37.869841,
        y: -122.267666,
        address: '2181 Shattuck Ave,Berkeley',
        pictureDescription: 'Jupiters in Berkeley',
        uiDescription: 'No better place to go with a group of friends',
        telephone: 'Number: (510) 843-8277',
        website: 'Website: jupiterbeer.com',
        money: '$: $$',
        uiAddress: 'Address: 2181 Shattuck Ave,Berkeley',
        rating: 'Rating: 4.0'
    },
    {
        name: 'Chipotle',
        x: 37.868368,
        y: -122.259009,
        address: '2311 Telegraph Ave, Berkeley',
        pictureDescription: 'Chipotle Mexican food Berkeley',
        uiDescription: 'A staple for any college kid',
        telephone: 'Number: (510) 548-0340',
        website: 'Website: chipotle.com',
        money: '$: $',
        uiAddress: 'Address: 2311 Telegraph Ave, Berkeley',
        rating: 'Rating: 3.5'
    },
    {
        name: 'Chez Panisse',
        x: 37.880370,
        y: -122.268869,
        address: '1517 Shattuck Ave, Berkeley',
        pictureDescription: 'Chez Panisse',
        uiDescription: "It's famous in Berkeley for a good reason",
        telephone: 'Number: (510) 548-5525',
        website: 'Website: chezpanisse.com',
        money: '$: $$$',
        uiAddress: 'Address: 1517 Shattuck Ave, Berkeley',
        rating: 'Rating: 4.4'
    },
    {
        name: 'Build Pizzeria Roma',
        x: 37.867667,
        y: -122.268106,
        address: '2286 Shattuck Ave, Berkeley',
        pictureDescription: 'Build Pizza Berkeley',
        uiDescription: "So... I really like pizza",
        telephone: 'Number: (510) 898-1839',
        website: 'Website: buildpizzeria.com',
        money: '$: $$',
        uiAddress: 'Address: 2286 Shattuck Ave, Berkeley',
        rating: 'Rating: 4.4'
    },
    {
        name: 'Cheese Board Pizza',
        x: 37.879859,
        y: -122.269490,
        address: '1512 Shattuck Ave, Berkeley',
        pictureDescription: 'Cheese Board Pizza Berkeley',
        uiDescription: "It's a tradition that every freshmen goes here once",
        telephone: 'Number: (510) 549-3055',
        website: 'Website: cheeseboardcollective.com',
        money: '$: $',
        uiAddress: 'Address: 2340 Telegraph Ave, Berkeley',
        rating: 'Rating: 4.5'
    },
    {
        name: "Phil's Sliders",
        x: 37.871479,
        y: -122.268545,
        address: '2024 Shattuck Ave, Berkeley',
        pictureDescription: "Phil's Sliders Berkeley",
        uiDescription: "One of the best snacks to get between classes",
        telephone: 'Number: (510) 845-5060',
        website: 'Website: philssliders.com',
        money: '$: $',
        uiAddress: 'Address: 2024 Shattuck Ave, Berkeley',
        rating: 'Rating: 3.9'
    },
    {
        name: "La Val's",
        x: 37.875486,
        y: -122.260390,
        address: '1834 Euclid Ave, Berkeley',
        pictureDescription: "La Val's Pizza",
        uiDescription: "Italian food :)",
        telephone: 'Number: (510) 540-9333',
        website: 'Website: lavals.com',
        money: '$: $',
        uiAddress: 'Address: 1834 Euclid Ave, Berkeley',
        rating: 'Rating: 3.4'
    }
];

/**
* This class will hold all our relevant information in ko.observables
* @class
* @param data corresponds to each object we are reading from our array initialPlaces
*/
var Place = function(data)
{
    /**
    * restaurant location
    * @public
    * @type ko.observable
    */
    this.location = ko.observable(data.location);
    /**
    * restaurant name
    * @public
    * @type ko.observable
    */
    this.name = ko.observable(data.name);
    /**
    * boolean responsible for showing the place or not
    * @public
    * @type ko.observable
    */
    this.shouldShowPlace = ko.observable(true);
    /**
    * restaurant address
    * @public
    * @type ko.observable
    */
    this.address = ko.observable(data.address);
    /**
    * description of the picture which we will give to the flickr api to search pictures
    * @public
    * @type ko.observable
    */
    this.pictureDescription = ko.observable(data.pictureDescription);
    /**
    * boolean responsible for if the description of the place should be shown or not
    * @public
    * @type ko.observable
    */
    this.shouldShowDescription = ko.observable(true);
    /**
    * boolean responsible for if the picture of the place should be shown or not
    * @public
    * @type ko.observable
    */
    this.shouldShowPlacePicture = ko.observable(true);
    /**
    * restaurant address shown in UI
    * @public
    * @type ko.observable
    */
    this.shouldShowUIAddress = ko.observable(true);
    /**
    * restaurant desscription shown in UI
    * @public
    * @type ko.observable
    */
    this.uiDescription = ko.observable(data.uiDescription);
    /**
    * restaurant latitude
    * @public
    * @type ko.observable
    */
    this.x = ko.observable(data.x);
    /**
    * restaurant longitude
    * @public
    * @type ko.observable
    */
    this.y = ko.observable(data.y);
    /**
    * restaurant url responsible for getting us the picture
    * @public
    * @type ko.observable
    */
    this.picUrl = ko.observable('http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + data.address + '');
    /**
    * restaurant telephone number
    * @public
    * @type ko.observable
    */
    this.telephone = ko.observable(data.telephone);
    /**
    * restaurant website
    * @public
    * @type ko.observable
    */
    this.website = ko.observable(data.website);
    /**
    * restaurant money rating
    * @public
    * @type ko.observable
    */
    this.money = ko.observable(data.money);
    /**
    * restaurant address shown in the UI
    * @public
    * @type ko.observable
    */
    this.uiAddress = ko.observable(data.uiAddress);
    /**
    * restaurant rating
    * @public
    * @type ko.observable
    */
    this.rating = ko.observable(data.rating);
    /**
    * restaurant string that combines the telephone and money
    * @public
    * @type ko.computed
    */
    this.telephoneAndMoney = ko.computed(function(){
        return this.telephone() + ' ' + this.money();
    }, this);
    /**
    * restaurant string that combines the website and rating
    * @public
    * @type ko.computed
    */
    this.websiteAndRating = ko.computed(function(){
        return this.website() + ' ' + this.rating();
    }, this);
    /**
    * restaurant boolean responsible for showing the telephone number and money
    * @public
    * @type ko.observable
    */
    this.shouldShowTelephoneAndMoney = ko.observable(true);
    /**
    * restaurant boolean responsible for showing the website and rating
    * @public
    * @type ko.observable
    */
    this.shouldShowWebsiteAndRating = ko.observable(true);
};

/**
* Our ViewModel which is reposible for communication between the view and model
* @class
*/
var ViewModel = function()
{
	var self = this;
    var i = 0;
    //word that the user will type in that will determine which items stay in the list or not
	self.filterWords = ko.observable();
	//this section populates our list with all the place objects containing all their attributes
	self.placesList = ko.observableArray();
    /**
    * Array of Point objects that will correspond to the markers on our map
    * @public
    * @type ko.observablearray
    */
    var points = new ko.observableArray();
    //add a new place item in placelist  & add point object for every place inside initialplaces
	initialPlaces.forEach(function(placeItem)
    {
	   self.placesList.push(new Place(placeItem));
       points.push(new Point(placeItem.name, placeItem.x, placeItem.y, placeItem.address));
	});
    //responsible for functionality when the user clicks search
	self.filterList = function() {
		//go through each item, see if it matches the filter word, and if it doesnt, get rid of it!
		//we have toLowerCase because we want to make it case insensitive
        var placesListLength = self.placesList().length;
        if (self.filterWords() !== undefined) {
    		for (i = 0; i < placesListLength ; i++)
        	{
        	 	if (!(self.placesList()[i].name().toLowerCase().search(self.filterWords().toLowerCase()) > -1))
        	 	{
        	 		self.placesList()[i].shouldShowPlace(false);
                    self.placesList()[i].shouldShowDescription(false);
                    self.placesList()[i].shouldShowPlacePicture(false);
                    self.placesList()[i].shouldShowUIAddress(false);
                    self.placesList()[i].shouldShowTelephoneAndMoney(false);
                    self.placesList()[i].shouldShowWebsiteAndRating(false);
                    //when the words disapper, so must their markers
                    markers[i].setMap(null);
        	 	}
        	}
        }
        //clear the toggle when you click search
        $(".searchform").click(function(){
            if($('.navbar-toggle').css('display') !='none'){
                $(".navbar-toggle").trigger( "click" );
            }
        });
    };
    //responsible for functionality when the user clicks clear
    self.clearFilter = function()
    {
    	//clearing the filter means we show everything again
    	for (i = 0; i < self.placesList().length ; i++)
    	{
    	 	self.placesList()[i].shouldShowPlace(true);
            self.placesList()[i].shouldShowDescription(true);
            self.placesList()[i].shouldShowPlacePicture(true);
            self.placesList()[i].shouldShowUIAddress(true);
            self.placesList()[i].shouldShowTelephoneAndMoney(true);
            self.placesList()[i].shouldShowWebsiteAndRating(true);
    	}
    	//reset the value of the text box
    	self.filterWords("");
        //since we are clearing our filters, we make sure that we show every marker
        for (i = 0; i < markers.length; i++)
        {
            markers[i].setMap(map);
        }
        infowindow.close();

        //closing the toggle menu when you click clear
        $(".clear").click(function(){
            if($('.navbar-toggle').css('display') !='none'){
                $(".navbar-toggle").trigger( "click" );
            }
        });
    };
    //clear the picture panel
    self.clearPics = function()
    {
        //clear the pictures that were generated from flickr
        var $flickrPicRow1Elem = $('#flickr-picture-row1');
        var $flickrPicRow2Elem = $('#flickr-picture-row2');
        $flickrPicRow1Elem.empty();
        $flickrPicRow2Elem.empty();
        //show the map again
        self.showMap();

        //closing the toggle menu when you click clearpics
        $(".clear").click(function(){
            if($('.navbar-toggle').css('display') !='none'){
                $(".navbar-toggle").trigger( "click" );
            }
        });
    };
    //resposible for displaying the pictures using the flickr api
    self.displayFlickr = function(clickedRestaurant)
    {
        //grab the two rows of pictures and clear them so we can add new pictures for the selected place
        var $flickrPicRow1Elem = $('#flickr-picture-row1');
        var $flickrPicRow2Elem = $('#flickr-picture-row2');
        $flickrPicRow1Elem.empty();
        $flickrPicRow2Elem.empty();
        $.ajax({
            url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=31953374b94d3469c7570fec2c3acc67&text=' + clickedRestaurant.pictureDescription() +'&format=json&nojsoncallback=1',
            success: function(data)
            {
                var id;
                var farmid;
                var serverid;
                var secret;
                //appened 2 pictures to the top row
                for(i = 0; i < 2; i++)
                {
                    id = data.photos.photo[i].id;
                    farmid = data.photos.photo[i].farm;
                    serverid = data.photos.photo[i].server;
                    secret = data.photos.photo[i].secret;
                    $flickrPicRow1Elem.append('<img class = "flickr-img" src="https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg"/ alt= "flickrimg">');
                }
                //append 2 pictures to the bottom row
                for(i = 2; i < 4; i++)
                {
                    id = data.photos.photo[i].id;
                    farmid = data.photos.photo[i].farm;
                    serverid = data.photos.photo[i].server;
                    secret = data.photos.photo[i].secret;
                    $flickrPicRow2Elem.append('<img class = "flickr-img" src="https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '.jpg"/ alt= "flickrimg">');
                }
            },
            error: function(xhr, errorType, exception)
            {
                $flickrPicRow1Elem.append('<p>An error has occurred</p>');
                $flickrPicRow2Elem.append('<p>An error has occurred</p>');
                if (exception !== "") {
                    alert(exception);
                }
                else{
                    alert(errorType);
                }

            }
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
        $('.map-canvas').hide();
    };
    //responsible for showing the map
    self.showMap = function()
    {
        $('.map-canvas').show();
    };
    //center the map
    self.mapCenter = function (map)
    {
        var center = new google.maps.LatLng(37.871865, -122.258628);
        map.panTo(center);

        //closing the toggle menu when you click center map
        $(".center-map").click(function(){
            if($('.navbar-toggle').css('display') !='none'){
                $(".navbar-toggle").trigger( "click" );
            }
        });
    };
    //ui call bound to mapcenter
    self.moveCenter = function()
    {
        self.mapCenter(map);
    };
};

//error checking for making the map
try{
    map = new google.maps.Map(document.getElementsByClassName('map-canvas')[0], {
        center: new google.maps.LatLng(37.871865, -122.258628),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}
catch (error)
{
    alert("Unfortunately, the information on this page cannot be loaded z");
    console.log("Something went wrong: ", error);
}
/**
* This class is responsible for making the markers, putting them on the map, and infowindows
* @class
* @param {string} name name of the point
* @param {double} lat lat of the point
* @param {double} long long of the point
* @param {string} address address of the point
*/
function Point(name, lat, long, address) {
    try{
        this.name = name;
        this.lat = ko.observable(lat);
        this.long = ko.observable(long);
        this.address = address;

        var myLatlng = new google.maps.LatLng(lat,long);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: name
        });
        //console.log(address); // at this point thye are different addresses

        //var that = this;
        var picSrc = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + this.address + ' ';

        $.ajax({
            url: picSrc,
            success: function(){
                //console.log('picSrc: ' + picSrc);
                var contentString = '<img src="' + picSrc + ' "' + 'alt="no picture found">';

                //infowindow.setContent(contentString);
                //console.log(infowindow);
                //console.log(infowindow.content);
                //console.log(this.center1)
                google.maps.event.addListener(marker, 'click', (function(markers,contentStrings) {
                    return function()
                    {
                        infowindow.setContent(contentStrings);
                        infowindow.open(map,markers);
                        map.setCenter(markers.getPosition());
                    };
                })(marker, contentString));

                markers.push(marker);
                //infowindowarr.push(infowindow);
            },
            error: function(xhr, errorType, exception)
            {
                if (exception !== "") {
                    alert(exception);
                }
                else{
                    alert(errorType);
                }
            }
        });
    }
    catch (error){
        alert("Unfortunately, the information on this page cannot be loaded");
        console.log("Something went wrong: ", error);
    }
}

//apply data-bindings we made
ko.applyBindings(new ViewModel());