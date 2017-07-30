function initMap() {
   const location = {lat: 51.111681, lng: 17.051795};
   const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: location,
   });
   const marker = new google.maps.Marker({
   	position: location,
      map: map,
   });
}
