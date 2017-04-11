var viewModel = function() {
    var self = this;
    this.locationList = [];
    this.resultList = ko.observableArray();
    this.searchLocation = ko.observable();
    this.locationList = initLocations;
    this.resultList(this.locationList);
    this.findLocation =function() {
        var list = [];
        if(self.searchLocation()) {
            console.log(self.searchLocation());
            initLocations.forEach(function(item) {
                if(item.title.toLowerCase().match(self.searchLocation().toLowerCase())) {
                    list.push(item);
                }
            });
            console.log(list);
            self.resultList(list);
        } else {
            self.resultList(self.locationList);
        }

    };


};

var initLocations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];








ko.applyBindings(new viewModel());