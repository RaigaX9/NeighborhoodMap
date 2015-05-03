//Global Variables
var map; //Variable for Google Maps
variousmarkers = []; //List various markers on the map

function getVariousMarkers(){
    return variousmarkers;
}
//This function will setup the map
function initialize() {
    //Sets the starting point when you first run the application.
    var startingloc = new google.maps.LatLng(33.7592995, -84.387982);

    //Google Maps options
    var mapOptions = {
        zoom: 14,
        center: startingloc,
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
        overviewMapControl: false
    };
    try {
        //Creates a map object
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        $('#map-canvas').height($(window).height());
    } catch(err){
        $('#map-canvas').hide();
        $('#map-error').html('<h5>There is problem for retrieve data from Google Maps</br>Please try again later</h5>');
    }

}

//Displays markers on the map
function addMarkers(m){
    //This will display multiple markers on the map
    var infoWindow = new google.maps.InfoWindow();

    //This will create the infoWindow.
    function createInfoWindow(iw){
       //This will create the DOM elements for the marker window which will show the business name, phone number,
       //the reviewers' images, and their reviews.
        var iwcontent = '<div class="information">';
        iwcontent += '<h4>' + iw.title + '</h4>';
        iwcontent += '<p>' + iw.ph + '</p>';
        iwcontent += '<p class="review"><img src="' + iw.pic + '">' + iw.blurb + '</p>';
        iwcontent += '</div>';
        //var iwcontent = (document.getElementById('iw'));
        //Sets the content on the markers.
        infoWindow.setContent(String(iwcontent));

        //Creates data for the marker.
        infoWindow.open(map, iw);
    }

    //Bouncing marker animation.
    function bouncing(iw, i) {

        var yelpMarkerGUI =  $('.yelp-list').find('ul'), yelpMarkerPos = 212 * i,
            yelpMarkerDetail = yelpMarkerGUI.find('li'), yelpMarkerActive = yelpMarkerDetail.eq(i);

        //If there is an animation attribute, it will remove the other animation attributes that will remove
        //both 'show' and 'active' from the DOM.
        if (iw.getAnimation() != null) {
            iw.setAnimation(null);
            yelpMarkerGUI.removeClass('show');
            yelpMarkerActive.removeClass('active');
        }

        //If there is no animation attribute, then it will remove the animation attributes from other markers
        //that are animated and will set it when the marker is clicked
        else {
            for(x in variousmarkers){
                //This variable will iterate through all the markers and check if the animation attribute exists.
                var bounce = variousmarkers[x].getAnimation();

                //If there is no marker animated, then it will be set as null.
                if(bounce && x !== i){
                    variousmarkers[x].setAnimation(null);
                }
            }

            //This will set the 'BOUNCE' animation.
            iw.setAnimation(google.maps.Animation.BOUNCE);
            yelpMarkerGUI.addClass('show').animate({
                scrollTop: yelpMarkerPos
            }, 300);
            yelpMarkerGUI.find('.active').removeClass('active');
            yelpMarkerActive.addClass('active');
        }
    }

    //This will add the click event on the results list.
    $('.results').find('li').click(function(){
        // get index of clicked element
        var pos = $(this).index();
        // iterate through variousmarkers array
        for(x in variousmarkers){
            var bounce = variousmarkers[x].getAnimation();
            // if marker is animated, remove animation
            if(bounce && x !== pos){
                variousmarkers[x].setAnimation(null);
            }
        }

        //This will add the 'BOUNCE' animation to the marker when they are clicked as well as showing
        //the infowindows.
        variousmarkers[pos].setAnimation(google.maps.Animation.BOUNCE);
        createInfoWindow(variousmarkers[pos]);
        $('.results').find('.active').removeClass('active');
        $(this).addClass('active');
    });

    //This will delete all the markers on the map.
    function deleteMarkers(){

        for(var i = 0, limit = variousmarkers.length; i < limit; i++ ) {
            variousmarkers[i].setMap(null);
        }

        //Resets the variousmarkers.
        variousmarkers = [];
    }

    //This will tell if there are any markers, it will call the deleteMarkers method to remove them.
    if(variousmarkers.length > 0){
        deleteMarkers();
    }
    //This will loop an array of markers and locations at each places on the map.
    for(var i = 0, limit = m.length; i < limit; i++ ) {
        //Position
        var position = new google.maps.LatLng(m[i][2], m[i][3]);
        //Marker object
        var mark = new google.maps.Marker({
            map: map,
            position: position,
            animation: google.maps.Animation.DROP,
            title: m[i][0],
            ph: m[i][1],
            pic: m[i][4],
            blurb: m[i][5]
        });
        //Updates the variousmarkers array using the mark object
        variousmarkers.push(mark);

        //Binds the mouseover event where the infowindow will popup when hovering over the markers.
        google.maps.event.addListener(mark, 'mouseover', (function(iw, i) {
                return function() {
                    createInfoWindow(iw);
                }
            })(mark, i));

        //Bind the click event where the marker will bounce.
        google.maps.event.addListener(mark, 'click', (function(iw, i){
                return function(){
                    createInfoWindow(iw);
                    bouncing(iw, i);
                };
            })(mark, i));
    }

}

//Yelp Ajax that will bind to Knockout and creating the markers on the map.
function yelpAjax(searchNear, searchFor) {
    //Yelp OAuth Info
    var auth = {
        consumerKey : "HUdaOWw_64VTdil8G2oOdw",
        consumerSecret : "V1VlDm-cjBE_lqIXrubBu4J2y-M",
        accessToken : "KOGQ4Lp-TpPiur0GcM4APYpN4T4R9kA0",
        accessTokenSecret : "qKL4acZMm9UChej1sxS7KvqPmpE",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };

    //Accessor for OAuth
    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };

    //Parameters in an array for creatting a message as an JSON object.
    var parameters = [];
    parameters.push(['term', searchFor]);
    parameters.push(['location', searchNear]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    //Creates a JSON object for message for retrieving the information from Yelp's API.
    var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    ///Using OAuth for setting the messages and retrieving the information from Yelp's data.
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var pmap = OAuth.getParameterMap(message.parameters);
    yelpData(message.action, pmap);
}

//Yelp's data using Ajax OAuth method.
function yelpData(url, ydata){
    $.ajax({
        'url' : url,
        'data' : ydata,
        'dataType' : 'jsonp',
        'global' : true,
        'jsonpCallback' : 'cb',
        'success' : function(data){
            getYelpList(data);
        },
        'error' : function(request, status, error){
            alert("Please check your Internet connection. Please try it later!");
        }
    });
}

//This will create a list from Yelp's API and return the data from Ajax as a parameter.
function getYelpList(d){

    var $yelpList = $('.results');
    results = d.businesses,
        ele = '';

    //Clears the list.
    $yelpList.empty();

    //Markers array
    var markers = [];

    //If there is no data, then it will create a loop to populate the yelp-list
    //in the DOM li.
    if(results.length > 0){
        for (result in results){
            var business = results[result],
                name = business.name,
                img = business.image_url,
                ph = /^\+1/.test(business.display_phone) ? business.display_phone : '',
                url = business.url,
                stars = business.rating_img_url_small,
                rate = business.rating,
                loc = {
                    lat: business.location.coordinate.latitude,
                    lon: business.location.coordinate.longitude,
                    address: business.location.display_address[0] + '<br>' + business.location.display_address[business.location.display_address.length - 1]
                },
                review = {
                    img: business.snippet_image_url,
                    txt: business.snippet_text
                };

            //HTML DOM objects
            var createel = '<li><div class="heading row"><p class="col-sm-3 img-container">';
            createel += '<img src="' + img + '" height=100 width=100">';
            createel += '<img src="' + stars + '" height=17 width=84 alt="Yelp Rating">';
            createel += '</p><div class="col-sm-9">';
            createel += '<h3>' + name + '</h3><p>';
            createel += '<span>' + loc.address + '</span></p>';
            createel += '<p><strong>' + ph + '</strong></p>';
            createel += '<p><a class="btn btn-warning" href="' + url + '" target="_blank">Yelp It!</a></p>';
            createel += '</div></div></li>';

            ele += createel;

            //Creates and add the marker array consisting of name, number, locations, review image, and review details.
            var marker = [name, ph, loc.lat, loc.lon, review.img, review.txt];
            markers.push(marker);
        }

        $yelpList.append(ele);

        //Place markers on the map
        google.maps.event.addDomListener(window, 'load', addMarkers(markers));
    }
    //If there is no data, it will create an error message.
    else {
        var searchedFor = $('input').val();
        $yelpList.addClass('open').append('<li><h3>Can\'t find what you\'re searching for. <span>' + searchedFor + '</span>.</h3><p>Trying searching something else.</p></li>');

        //Clears the markers on the map.
        google.maps.event.addDomListener(window, 'load', addMarkers(markers));
    }
}

//Initializes google maps
initialize();

//Calls yelpAjax to load the information of the zip code and search.
yelpAjax('30308', 'Sushi');
