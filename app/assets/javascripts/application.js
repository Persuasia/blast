// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation);
        console.log("just got geolocation");

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        console.log("can't get geolocation");
    }
}

function setLocation(position){
    console.log("setting")
    lat = position.coords.latitude;
    lon = position.coords.longitude;

     $.ajax({
                  url: '/setloc',
                  method: 'PATCH',
                  data: {latitude: lat, longitude: lon}
                }).done(function() {
                  console.log("done")

            })

            function initialize() {
              var currentLocation = new google.maps.LatLng(lat,lon);
              console.log(lat)

              map = new google.maps.Map(document.getElementById('map'), {

              });

              var request = {
                location: currentLocation,
                types: ['school', 'restaurant'],
                rankBy: google.maps.places.RankBy.DISTANCE
              };

              service = new google.maps.places.PlacesService(map);
              service.nearbySearch(request, callback);
            }


          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {

              var htmlStr = '<ul>';
              for (var i = 0; i < results.length; i++) {
                  var place = results[i];

                  htmlStr += '<li class="name">'+ place.name + '<span class="invisible">' + place.id + '</span>'
                  // + '<img src=' + place.icon + '>'
                  ;
                }
              htmlStr += '</ul>';

              document.getElementById("myPlace").innerHTML = htmlStr;
              $('#myPlace').find('li').click(function(){
                grabPlace($(this).find("span")[0].innerHTML, this.innerText);

              })

             }
           }
           function grabPlace(id, name){
             console.log(id, name)
             $.ajax({
                 url: '../places/' + id,
                 method: 'GET'

           }).success(function(data,error){
             if(data.length == 0){
                  console.log("does not exist in database")
                  $.ajax({
                      url: '../places.json',
                      method: 'POST',
                      data: {id: id, name: name}
                    }).done(function(response, error) {
                        console.log(response)

                  })

             }


           })


         }


          initialize()

        // }


}
