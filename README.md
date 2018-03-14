# Neighborhood Map

This website is for the Front-End Web Developer nanodegree project where we have to create a neighborhood map at a
certain location using Google Maps API and/or other third party APIs.

## About the website
This website shows the available places around Atlanta that uses Google Maps and FourSquare API. This also uses bower components
 such as Bootstrap, jQuery, and Knockout since it does give better performance for using the APIs. If the user clicks on the
marker, a list will pop out on the left consisting of what the user selected and other results of what the user searched
for. They will see what the rating is for that place, a streetview image, and a website link to learn
more about it.

You can run the program by simply running the `index.html` on the root level.

## src folder aka The Original Folder
- `index.html` - Main HTML file.
- `js/app.js` - Main Javascript file that contains both Google Maps and FourSquare APIs and their functions.
- `css/style.css` - Main CSS file.
- `lib/knockout-3.3.0.js` - Knockout.js, but that is never used since I've found out that bower provides an efficient
way for running the website.

## extra folder
- Consists of previous submission which is similar, but uses the Yelp API instead.

## Root folder
- All the files mentioned from the `src` folder (except for `knockout-3.3.0.js`) are all minified using grunt.
- `package.json` - Shows the following grunt modules installed for the project.
- `Gruntfile.js` - Integrating the grunt modules to minify the original files into the root folder.
- `bower.json` - Used to install the following bower components mentioned from above.

## Resources
- [Udacity Intro to Ajax](https://www.udacity.com/course/intro-to-ajax--ud110)
- [Udacity Javascript Design Patterns](https://www.udacity.com/course/javascript-design-patterns--ud989)
- [Google Maps API - Marker Animations](https://developers.google.com/maps/documentation/javascript/examples/marker-animations)
- [Google Maps API - Controls](https://developers.google.com/maps/documentation/javascript/controls)
- [Google Maps API - LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds)
- [Youtube - Introduction to the Google Maps API](https://www.youtube.com/watch?v=ZE8ODPL2VPI)
- [Youtube - Google Maps Javascript API](https://www.youtube.com/watch?v=keO6egndYrE)
- [jQuery.ajax()](http://api.jquery.com/jquery.ajax/)
- [KnockoutJs - Tutorial](http://learn.knockoutjs.com/)
- [KnockoutJs - Observables](http://knockoutjs.com/documentation/observables.html)
- [KnockoutJs - Binding Syntax](http://knockoutjs.com/documentation/binding-syntax.html)
- [KnockoutJs - HTML Binding](http://knockoutjs.com/documentation/html-binding.html)
- [KnockoutJs - CSS Binding](http://knockoutjs.com/documentation/css-binding.html)
- [FourSquare API Developers Main Page](https://developer.foursquare.com/)
- [FourSquare API - Explorer - Connecting](https://developer.foursquare.com/overview/auth)
- [FourSquare API - Explorer](https://developer.foursquare.com/docs/explore#req=venues/explore%3Fll%3D40.7,-74)
- [FourSquare API - Checkins](https://developer.foursquare.com/docs/users/checkins)
- [FourSquare API - Venue](https://developer.foursquare.com/docs/venues/venues)
- [FourSquare API - Venue Group](https://developer.foursquare.com/docs/venuegroups/venuegroups)
- Stack Overflow
