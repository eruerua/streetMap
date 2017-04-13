"use strict";

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
          initLocations.forEach(function(item) {
              if(item.title.toLowerCase().match(self.searchLocation().toLowerCase())) {
                  list.push(item);
              }
          });
          self.resultList(list);
      } else {
          self.resultList(self.locationList);
      }
  };
};

var initLocations = [
  {title: 'Lincoln Center for the Performing Arts', location: {lat: 40.7724641,lng: -73.9834889}},
  {title: 'Radio City Music Hall', location: {lat: 40.75997599999999, lng: -73.9799772}},
  {title: 'United Nations Headquarters', location: {lat: 40.7488758, lng: -73.9680091}},
  {title: 'Gramercy Theatre', location: {lat: 40.7398133, lng: -73.98498169999999}},
  {title: 'Central Park Zoo', location: {lat: 40.767778, lng: -73.9718335}},
  {title: 'Empire State Building', location: {lat: 40.7484405, lng: -73.98566439999999}},
  {title: 'Whitney Museum of American Art', location: {lat: 40.7395877, lng: -74.0088629}}
];

ko.applyBindings(new viewModel());