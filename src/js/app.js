//Variable for Google Maps
var themap;

//This will initialize Google Maps with additional features.
function initialize() {

    var mapOptions = {
        zoom: 14,
        panControl: false,
        panControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        overviewMapControl: false,
        streetViewControl: false
    };

    try {
        themap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        $('#map-canvas').height($(window).height());
    } catch (err) {
        //If the Google Maps API does not respond, it will load this error.
        $('#map-canvas').hide();
        alert('Please check your Internet connection. Please try it later!');

    }
}

//This is the model for each of the locations' information
var LocationsInfo = function(item) {
    this.name = ko.observable(item.venue.name);
    this.address = ko.observable(item.venue.location.formattedAddress);
    this.phone = ko.observable(item.venue.contact.formattedPhone);
    this.rating = ko.observable(item.venue.rating);
    this.category = ko.observable(item.venue.categories[0].name);
    this.imgSrc = ko.observable('https://irs0.4sqi.net/img/general/75x75' + item.venue.photos.groups[0].items[0].suffix);
};

//This will create the Knockout View Model
var BusinessViewModel = function() {
    var self = this;

    ////List various markers on the map.
    var variousmarkers = [];

    //Creates an observable array to find various locations.
    self.locationlist = ko.observableArray([]);

    //Default location
    this.defaultloc = ko.observable("Atlanta, GA");

    //Default search
    this.defaultsearch = ko.observable("Sushi");

    //Display a list of places.
    self.showplaces = ko.observable('true');

    //Sets up and declares infowindow
    if (typeof google != "undefined") {
        var infowindow = new google.maps.InfoWindow();
    }

    //Sets the map boundaries based from the FourSquare API.
    function setMapBoundaries(prefferedbounds) {
        if (typeof google != "undefined") {
            //SouthWest and NorthEast coordinates
            var boundto = new google.maps.LatLngBounds(
                new google.maps.LatLng(prefferedbounds.sw.lat, prefferedbounds.sw.lng),
                new google.maps.LatLng(prefferedbounds.ne.lat, prefferedbounds.ne.lng));
            themap.fitBounds(boundto);
            // center the map
            themap.setCenter(boundto.getCenter());
        }

    }

    //This will perform the search function.
    self.searchLocations = function() {

        //This array will pass each location in the map.
        var all_locations = [];
        deleteMarkers();

        //This will empty the the list of array for each search.
        self.locationlist([]);

        //This will query the places from the input.
        var query = '&query=' + self.defaultsearch();

        //Sets to find the nearest places from the API's request.
        var nearloc = '&near=' + self.defaultloc();

        //Loads the locations by using the FourSquare API token information.
        var foursquareinfo = 'https://api.foursquare.com/v2/venues/explore?' +
            '&client_id=DQIO5RG3KM2ONZTI25QP2FOVC0DEWRV44CCZBAUMTCVBDMNY' +
            '&client_secret= 4XQSDNXLIYF03KPUFVF2XOXGMKNPRAFK02AXLK4MDCUFRDH4' +
            '&v=20150501&venuePhotos=1' + nearloc + query;

        //Retrieves JSON data from the FourSqaure API.
        $.getJSON(foursquareinfo, function(data) {

            var places = data.response.groups[0].items;
            setMapBoundaries(data.response.suggestedBounds)

            for (var i = 0; i < places.length; i++) {
                var item = places[i];
                //This will show the items list along with their pictures.
                if (item.venue.photos.groups.length != 0) {
                    self.locationlist.push(new LocationsInfo(item));
                    all_locations.push(item.venue);
                };
            }

            //Sorts the list from highest to lowest ratings of each locations.
            self.locationlist.sort(function(left, right) {
                return left.rating() == right.rating() ? 0 : (left.rating() > right.rating() ? -1 : 1)
            });

            //Creates the markers on the map.
            markPlaces(all_locations);
        }).error(function(e) {
            //If FourSquare data isn't being retrieved due to WIFI or other connection issues, it will print out this error.
            alert('Please check your Internet connection. Please try it later!');
            console.log('error');
        });

    };

    //Will perform search.
    self.searchLocations();

    //This will create the infowindoes on the map.
    function createInfoWindow(data, marker) {

        /*The infowindow will consist of the locations, name, url, address, phone number, ratings,
         and street view images
         */
        var name = data.name;
        var locationurl = data.url;
        var address = data.location.address + ',' + data.location.city + ',' + data.location.country;
        var contact = data.contact.formattedPhone;
        var rating = data.rating;

        //Steetview image views along with their sizes.
        var streetviewlink = 'http://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + address + '';

        //Creates infowindow contents
        var infocontent = '<div class="vinfowindow">' + '<div class="venuename">' + '<a href ="' + locationurl + '" target="_blank" >'
            + name + '</a>' + '<span class="vrating label-info badge">' + rating + '<sub> /10</sub>' + '</span>' + '</div>'
            + '<div class="vcontact"><span class="icon-phone"></span>' + contact + '</div>' + '<img class="otherimg" src="'
            + streetviewlink + '">' + '</div>';

        //If you click on the marker, the infowindow will be displayed.
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(infocontent);
            infowindow.open(themap, marker);
        });
    }

    /**
     * createMarkers(data) reads mp information to create map pins.
     * @param {object} data - data is the object returned from search results containing information about the place from fourSquare Api
     */
    //This will create the markers on the map.
    function createMarkers(data) {

        var name = data.name;
        var lat = data.location.lat;
        var lon = data.location.lng;

        if (typeof google != "undefined") {

            //Initializes the marker as an object with different behaviors.
            var marker = new google.maps.Marker({
                map: themap,
                title: name,
                position: new google.maps.LatLng(lat, lon),
                animation: google.maps.Animation.DROP
            });
            google.maps.event.addListener(marker, 'click', bouncing);

            //Saves the marker for each locations in this array
            variousmarkers.push(marker);

            createInfoWindow(data, marker)
        }

        //This will have the markers bounce for a short while once you click on them.
        function bouncing() {

            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function(){ marker.setAnimation(null); }, 2000);
            }
        }
    }

    //This will delete all the markers on the map.
    function deleteMarkers() {
        for (var i = 0; i < variousmarkers.length; i++) {
            variousmarkers[i].setMap(null);
        }

        //Resets the variousmarkers.
        variousmarkers = [];
    }

    //This will take the marked places as an array from the FourSquare API and creates the markers to each location.
    function markPlaces(mp) {
        // call createMarkers for places
        for (var i in mp) {
            createMarkers(mp[i]);
        }
    }
    /**
     * Change the boolean value of displaying places list
     * When user click on collapsible icon
     */
        //When the user clicks on the '+' or '-' button, it will display or collapes the list of results on a mobile device.
    self.showList = function() {
        self.showplaces(!self.showplaces());
    };

    //If the list of items is clicked, it will find the marker on the map.
    self.focusMarker = function(venue) {
        var venuename = venue.name();
        for (var i = 0; i < variousmarkers.length; i++) {
            if (variousmarkers[i].title == venuename) {
                google.maps.event.trigger(variousmarkers[i], 'click');
                themap.panTo(variousmarkers[i].position);
            }
        }

        //This will have the resultslist not visible if the screen is small.
        if($('#resultslist').css('display')!="none"){
            self.showList();
        }

    };


};

//This will first initialize the map and apply the bindings for BusinessViewModel().
$(document).ready(function() {

    initialize();
    ko.applyBindings(new BusinessViewModel());

});
