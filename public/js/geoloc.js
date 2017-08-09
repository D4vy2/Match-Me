function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 48.897, lng: 2.318},
          zoom: 13,
          maxZoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP, 
          disableDefaultUI: false
          // scrollwheel: false
        });
 
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let elem = document.querySelector('#position');
            if (elem.value !== "") {
              let arr = elem.value.split(',');
              var pos = {
                lat: parseFloat(arr[0]),
                lng: parseFloat(arr[1])
              };
            } else {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            }
            elem.value = pos.lat + ',' + pos.lng;

              var marker = new google.maps.Marker({
              position: pos,
              map: map,
              animation: google.maps.Animation.BOUNCE,
              draggable: true,
              title: 'Click to change location'
            });
            
            marker.addListener('dragend', function(ev) {
            let lat = Math.round(marker.position.lat() * 1000) / 1000;
            let lng = Math.round(marker.position.lng() * 1000) / 1000;
            let position = document.querySelector('#position');
            position.value = lat + ',' + lng;
            });
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}

// Partie selection geolocation
var geoYes = document.querySelector('#yes');
var geoNo = document.querySelector('#no');
var map = document.querySelector('#map-container');

geoYes.addEventListener('click', function(ev) {
  map.style.display = 'block';
  initMap();
})

geoNo.addEventListener('click', function(ev) {
  position.value = "";
  map.style.display = 'none';
  getIp();
})

// Fait une requete ajax pour recuperer la position a partir de l'adresse ip.
function getIp() {
  xhr = new XMLHttpRequest();
  var url = "http://ip-api.com/json/";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("Geolocation disabled");
      let data = JSON.parse(xhr.responseText);
      let position = data.lat + ',' + data.lon;
      document.getElementById('position').value = position;
    }
  }
  xhr.send();
}