let directionsRenderer = null

window.onload = () =>
            {
     
                fetch("../json/Main.JSON")
                .then(response => response.json())
                .then(data => renderLocations(data))      
         
                let map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 9.9,
                    center: new google.maps.LatLng(52.530959363794125, -1.9049126170548054),
                    mapTypeId: google.maps.MapTypeId.ROADMAP                   
                })                               

                let infoWindow = new google.maps.InfoWindow()

                let icon = {
                    url: "../images/venue.png", // url
                    scaledSize: new google.maps.Size(30, 30), // scale the image to an icon size
                }

                directionsRenderer = new google.maps.DirectionsRenderer()
                directionsRenderer.setMap(map)
                
                directionsRenderer.setPanel(document.getElementById("directions"))
                
                calculateRoute()


                let renderLocations = (locations) => {
                    
                    locations.venues.map(venue =>
                        {

                            let content;
                            let result;
                            let subResult;

                            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                            // This is needed because if were rendering for example 6pm as the time, it will be rendered as 6.0, rather than 6.00
                            function calcTime(time)
                            {
                                if(time.getMinutes() === 0)
                                {
                                    return "00";
                                }
                                else{
                                    return time.getMinutes();
                                }
                            }

                            result = venue.events.map(function (evnt, index) { 
                           

                                // subResult maps out the variety of events taking place at the overall event, in a venue
                                subResult = evnt.subEvents.map(function (subEv)
                                    {
                                        return`<li>${subEv}</li>`;
                                    }).join('');




                                const ds = new Date(evnt.dateTimeStart);
                                const de = new Date(evnt.dateTimeEnd);
                                
                                if(index === 0) // The point of conditional statement -> line 64 -> in order for the bootstrap carousel to work properly, first class must have the active keyword, the rest should omit it
                                   {
                                   return `<div class="carousel-item active"> 
                                   <h2>${evnt.name}</h2>
                                   <p>${ds.getDate() + " " + months[ds.getMonth()]}</p>
                                   <p>${ds.getHours() + ":" + calcTime(ds) + " - " + de.getHours() + ":" + calcTime(de)}</p>
                                   
                                   <div style="height:120px;width:300px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
                                   <ul>`
                                   + subResult +
                                   `</ul>
                                   </div>


                                    </div>`
                                   }
                               else{ // The rest of the classes do not need the active keyword
                                   return `<div class="carousel-item">
                                   <h2>${evnt.name}</h2>
                                   <p>${ds.getDate() + " " + months[ds.getMonth()]}</p>
                                   <p>${ds.getHours() + ":" + calcTime(ds) + " - " + de.getHours() + ":" + calcTime(de)}</p>

                                   <div style="height:120px;width:300px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
                                   <ul>`
                                   + subResult +
                                   `</ul>
                                   </div>

                                   </div>`}}
                               ).join('');


                            if(venue.venue === true) // all objects inside the json files have (should have at least) a boolean "venue" field
                            //The reason for this -> venues have events, and the custom content for venues should show these events
                            // but places of worship, hotels, shops... would have their custom content rendered differently
                            {
                                content = `<div>
                                <h1>${venue.name}</h1>
                                <p>${"Tel: " + venue.phone}</p>
                         


                                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">`
                            + 
                            result
                             +
                            `
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                            </div>

                            </div>`
                            }
                            else
                            {
                                content = `<div>
                                <h1>Not A Venue Sorry</h1>
                                </div>`
                            }

                            let marker = new google.maps.Marker({
                                position: new google.maps.LatLng(venue.latitude, venue.longitude),
                                icon: icon,
                                map: map
                            })
        
                            google.maps.event.addListener(marker, "click", () =>
                            {
                                infoWindow.setContent(content)
                                infoWindow.open(map, marker)
                            })
                        })

                }

            }     
            
            function calculateRoute()
            {
                let start = document.getElementById("start").value
                let end = document.getElementById("end").value
                let travelMode = document.getElementById("travelMode").value

                let request = {origin: start,
                    destination: end,
                        travelMode: google.maps.TravelMode[travelMode]}

                directionsService = new google.maps.DirectionsService()
                directionsService.route(request, (route, status) =>
                {
                    if (status === google.maps.DirectionsStatus.OK)
                    {
                        directionsRenderer.setDirections(route)
                    }
                })
            }
