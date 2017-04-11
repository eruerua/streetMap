(function() {
  var menu = document.querySelector('#menu');
   var drawer = document.querySelector('.options-box');
   var mapContainer = document.querySelector('#mapContainer');
   menu.addEventListener('click', function(e) {
     if (drawer.style.display == "block") {
       console.log('ok');
       drawer.style.display = 'none';
       mapContainer.style.width = "100%";
     } else {
       mapContainer.style.width = "70%";
       drawer.style.display = 'block';
     }
   });
}());