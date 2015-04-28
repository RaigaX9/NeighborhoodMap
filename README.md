# Neighborhood Map

This website is for the Front-End Web Developer nanodegree project where we have to create a neighborhood map at a
certain location using Google Maps API and/or other third party APIs.

##About the website
This website shows the available places around Atlanta that uses Google Maps and Yelp API. This also uses bower components
 such as Bootstrap, jQuery, and Knockout since it does give better performance for using the APIs. If the user clicks on the
marker, a list will pop out on the left consisting of what the user selected and other results of what the user searched
for. They will see both what a reviewer will say about that place and gives them a link to the Yelp's page to learn
more about it.

You can run the program by simply running the `index.html` on the root level.

## src folder aka The Original Folder
- `index.html` - Main HTML file.
- `js/app.js` - Main Javascript file that contains both Google Maps and Yelp APIs and their functions.
- `js/model.js` - Model Javascript file that connects to Knockout.
- `css/style.css` - Main CSS file.
- `lib/knockout-3.3.0.js` - Knockout.js, but that is never used since I've found out that bower provides an efficient
way for running the website.

## Root folder
- All the files mentioned from the `src` folder (except for `knockout-3.3.0.js`) are all minified using grunt.
- `package.json` - Shows the following grunt modules installed for the project.
- `Gruntfile.js` - Integrating the grunt modules to minify the original files into the root folder.
- `bower.json` - Used to install the following bower components mentioned from above.