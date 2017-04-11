var map;
var markers = [];
var initLocations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

function initMap() {
        // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
    });
    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();
    createMarkers(initLocations);
    listEvent();
    document.getElementById('search-buttton').addEventListener('click', function() {
      var resultList = getList();
      hideListings();
      createMarkers(resultList);
      listEvent();

    });


    function createMarkers (resultList) {
      for (var i = 0; i < resultList.length; i++) {
        // Get the position from the location array.
        var position = resultList[i].location;
        var title = resultList[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
    }

    // Extend the boundaries of the map for each marker



    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker = null;
        });
      }
    }

    function hideListings() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }

    function getList() {
      var list = document.getElementsByClassName('locationList');
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

    function listEvent() {
      var list = document.getElementsByClassName('locationList');
      for (var i =0; i < list.length; i++) {
        var currentList = list[i];
        var title = currentList.innerText;
        console.log(currentList);
        currentList.addEventListener('click',(function(titleCop) {
          return function() {
            var resultList = [];
            for(var i = 0; i< initLocations.length; i++) {
              if (titleCop == initLocations[i].title) {
                resultList.push(initLocations[i]);

              }
            }
            console.log(resultList);
            hideListings();
            createMarkers(resultList);
          }
        })(title));
      }
    }
}