Documentation for Project 5
---------------------------

Contact
-------
Email:kagbulos1@gmail.com

Date
----
5/21/15

Description
-----------
My favorite restaurants marked on a google map. There is also a list of them on the right hand side. At the top is a search bar to help you find a desired location. Click on the markers to show a picture of the restaurant. Click on a restaurant in the list to display pictures taken from flickr. Click clear to undo everything. Click center map to reorient map.

Api used
--------
Google maps, google streetview, flickr

Installion
----------
Click on dist/index.html
The src folder refers to everything that is minified and production quality
The dist folder refers to the original and can be read to easily see my comments/logic

Changes I've made since last submission
---------------------------------------
*I read every comment in both the code review and project feedback. As a result, I have done my best to incorporate every suggestion into my project and the ones that weren't, I've done testing with them and gained a familiarity such that they will show up in future projects I do (i.e. gulp and grunt).

1) added ratings, address, telephone, for each restaurant
2) added info windows with pictures for when a user clicks on a marker
3) added a center map button
4) made the app more responsive by incorporating a navbar which is collapsable as well as making the map itself responsive
5) improved comment quality by using jsdoc (located within the documentation folder) *couldn't provide comments for functions that started with self i.e. self.filterList()
6) modified my mvvm structure to hopefully follow the mvvm pattern better
7) minified version of code (found in dst folder)
8) modified my readme based on the link provided
9) added error checking to flickr and google streetview api calls via error option in ajax calls

