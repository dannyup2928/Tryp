var placeSearch, autocomplete, geocoder, finalLocation;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete'))/*,
      {types: ['(cities)']}*/);

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        alert(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

function fillInAddress() {
  finalLocation = autocomplete.getPlace();
  //alert(finalLocation.place_id);
  //   codeAddress(document.getElementById('autocomplete').value);
}

//from Danny
// Call Geocode
    //geocode();

    // Get location form
    //var locationForm = document.getElementById('location-form');

    // Listen for submiot
    //locationForm.addEventListener('submit', geocode);

    function geocode(e){
      // Prevent actual submit
      e.preventDefault();

      var location = finalLocation;

      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:'AIzaSyAEhxtMzG56_yTDfksqTnV60CD-CGr8k4s'
        }
      })
      .then(function(response){
        // Log full response
        console.log(response);


        // Address Components
        var addressComponents = response.data.results[0].address_components;

        for(var i = 0;i < addressComponents.length;i++){
          addressComponentsOutput += `
            <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
          `;
        }
        addressComponentsOutput += '</ul>';

        // Geometry
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;

			       var jsonData =[];

        var combinedCoords = lat + "," + lng;
        $.ajax({
          type:"GET",
          url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=bXjttOho3RvIAZAjzKZpfVgg4gbFFMcv&latlong=" + combinedCoords,
          async:true,
          dataType: "json",
          success: function(json) {
              console.log(json);
              // Parse the response.
              showEvents(json);
			  document.getElementById('events').innerHTML = jsonData.join("<br/>");
;

              // Do other things.
           },
          error: function(xhr, status, err) {
              // This time, we do not end up here!
              console.log(error);
           }
        })
        function showEvents(json){
          for(var i = 0; i < json.page.size; i++){
			jsonData.push(json._embedded.events[i].name );

          }
        }
          

        console.log(jsonData);
        alert(jsonData);

        // Output to app

        innerHTML += jsonData;
        //document.getElementById('events').innerHTML += jsonData;
      })
      .catch(function(error){
        console.log(error);
      });
    }