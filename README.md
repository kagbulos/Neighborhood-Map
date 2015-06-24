Documentation for Neighborhood Map
---------------------------

Contact
-------
Email:kagbulos1@gmail.com

Date
----
6/23/15

Description
-----------
This is a single-page and responsive application built with Knockout.js framework and utilizes API such as Flickr and google maps. It has a full-page map that loads popular restaurants in Berkeley, CA as well as a list view of said locations that includes additional information such as rating and telephone number. The user can view recent pictures of food taken at each location (retrieved by AJAX request to Flickr API).


How to use
-----------
At the top is a search bar to help you find a desired location. Click on the markers to show a picture of the restaurant. Click on a restaurant in the list to display pictures taken from flickr. Click clear to undo everything. Click center map to reorient map.

Api used
--------
Google maps, google streetview, flickr

Installion
----------
Click on dist/index.html
The src folder refers to everything that is minified and production quality
The dist folder refers to the original and can be read to easily see my comments/logic

Additional Notes
----------------
This is the first project I made from scratch and is a better representation of my skillset. In this project, I pushed myself to learn new ideas and concepts (even though they may not be included) because of my nautral curiosity. The things I learned include but are not limited to: Bower, Grunt, MVVM ideology, JSDoc, and offline.js.

Changes Log
-----------

6/15/15
----------------------------------------
1) added margin-top for list view so not touching the navbar at the top
2) after the clear pics button is clicked, the infowindow for the restaurant that was picked is opened

6/8/15
-----------------------------------------
1) modified style css to better conform to the udacity nanodegree style guide
2) removed [] in ko.observable array
3) saved self.placesList().length (line 309) into a variable to improve performance
4) added offline.js
5) when the navbar is in toggle mode, clicking clear map, clear pics OR center map closes the navbar
6) only one info window opens at a time
7) when the user clicks/touches a location, the map centers on that location
8) instead of using the clear button to close the picture panel, added clear pics button which will close the picture panel

6/1/15
---------------------------------------
1) added ratings, address, telephone, for each restaurant
2) added info windows with pictures for when a user clicks on a marker
3) added a center map button
4) made the app more responsive by incorporating a navbar which is collapsable as well as making the map itself responsive
5) improved comment quality by using jsdoc (located within the documentation folder) *couldn't provide comments for functions that started with self i.e. self.filterList()
6) modified my mvvm structure to follow the mvvm pattern better
7) minified version of code (found in dst folder)
8) modified my readme
9) added error checking to flickr and google streetview api calls via error option in ajax calls