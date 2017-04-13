"use strict";

var map;
var markers = [];
var initLocations = [
  {title: 'Lincoln Center for the Performing Arts', location: {lat: 40.7724641,lng: -73.9834889}},
  {title: 'Radio City Music Hall', location: {lat: 40.75997599999999, lng: -73.9799772}},
  {title: 'United Nations Headquarters', location: {lat: 40.7488758, lng: -73.9680091}},
  {title: 'Gramercy Theatre', location: {lat: 40.7398133, lng: -73.98498169999999}},
  {title: 'Central Park Zoo', location: {lat: 40.767778, lng: -73.9718335}},
  {title: 'Empire State Building', location: {lat: 40.7484405, lng: -73.98566439999999}},
  {title: 'Whitney Museum of American Art', location: {lat: 40.7395877, lng: -74.0088629}}
];
//change another styles for map
var styles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f3c5e4"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

//initMap function
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  var timer = window.setTimeout('alert("Google map load failure, please try again.")',4000);
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
  google.maps.event.addListener(map, 'tilesloaded', function() {
    window.clearTimeout(timer);
  });
  var bounds = new google.maps.LatLngBounds();
  var largeInfowindow = new google.maps.InfoWindow();
  createMarkers(initLocations,false);
  listEvent();
  $('#search-button').click(function() {
    var resultList = getList();
    hideListings();
    createMarkers(resultList,false);
    listEvent();
  });

  // hide and resize map when click hide menu
  var menu = $('#menu');
  var drawer = $('.options-box');
  var mapContainer = $('#mapContainer');
  var flag = true;
  menu.click(function(e) {
    if (drawer.css("display")=="block") {
      drawer.css("display", "none" );
      mapContainer.css("width","100%");
      google.maps.event.trigger(map, 'resize');
    } else {
      mapContainer.css("width","70%");
      drawer.css("display", "block" );
      google.maps.event.trigger(map, 'resize');
     }
   });

  //create marker for map, if flagForList is true, then a info window will be showed as soon as the marker is clicked.
  // or the info window will only be showed when the marker is clicked.
  function createMarkers (resultList,flagForList) {
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');
    for (var i = 0; i < resultList.length; i++) {
      // Get the position from the location array.
      var position = resultList[i].location;
      var title = resultList[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        icon: defaultIcon,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      if (flagForList) {
        populateInfoWindow(marker, largeInfowindow, title);
      }
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow, title);
      });
      bounds.extend(markers[i].position);
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }
    map.fitBounds(bounds);
  }

  //create info window for markers
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.setContent("");
      infowindow.marker = marker;
      var content = "";
      content += '<div>' + marker.title + '</div><hr />';
      getWiki(infowindow,marker.title,content);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.marker = null;
      });
    }
  }

  //hide markers
  function hideListings() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
  }

  //getList from location list
  function getList() {
    var list = $('.locationList');
    var resultTitle = [];
    var resultList = [];
    for (var i =0; i < list.length; i++) {
      resultTitle.push(list[i].innerText);
    }
    for(var i = 0; i< initLocations.length; i++) {
      if (resultTitle.includes(initLocations[i].title)) {
        resultList.push(initLocations[i]);
      }
    }
    return resultList;
  }

  // add locationList event
  function listEvent() {
    var list = $('.locationList');
    list.each(function(index,currentList)
    {
      var title = $(currentList).text();
      $(currentList).click((function(titleCop) {
        return function() {
          markers.forEach(function(marker) {
            if(marker.title == titleCop) {
              marker.setAnimation(google.maps.Animation.DROP);
              populateInfoWindow(marker, largeInfowindow);
            }
          });
        };
      })(title));
    });
  }

  //get wiki links
  function getWiki(infowindow,title,content) {
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&format=json&callback=wikiCallback';
        var wikiRequeatTimeout = setTimeout(function() {
            content += '<div>Failed to get wikipedia resources</div>';
            infowindow.setContent(content);
        }, 5000);
        content += '<div>Here is wiki links:</div>';
        $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(data) {
           // do something with data
            var wikilist = data[1];
            wikilist.forEach(function(article) {
                content += '<li style="list-style-type:none" class="article">' + '<a href="http://en.wikipedia.org/wiki/' + article + '">' + article + '</a>' + '</li>';
            });
            clearTimeout(wikiRequeatTimeout);
            infowindow.setContent(content);
        }
        });
  }

  //make marker icon
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }
}
