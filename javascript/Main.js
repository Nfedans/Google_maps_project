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


                let renderLocations = (locations) => {
                    
                    locations.venues.map(venue =>
                        {
                            let marker = new google.maps.Marker({
                                position: new google.maps.LatLng(venue.latitude, venue.longitude),
                                icon: icon,
                                map: map
                            })
        
                            google.maps.event.addListener(marker, "click", () =>
                            {
                                infoWindow.setContent(location[CONTENT])
                                infoWindow.open(map, marker)
                            })
                        })

                }

            }          