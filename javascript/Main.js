window.onload = () =>
            {
                // These constants must start at 0
                // These constants must match the data layout in the 'locations' array below
                const CONTENT = 0,
                    LATITUDE = 1,
                    LONGITUDE = 2

                let locations = [
                    ['Alexander Stadium', 52.530959363794125, -1.9049126170548054],
                    ['Arena Birmingham', 52.47984165695757, -1.9150531472507561],
                    ['Cannock Chase Forest', 52.75182255224424, -1.9749603872251655],
                    ['Coventry Stadium', 52.44686037563465, -1.4950558502820743],
                    ['Edgbaston Stadium', 52.45535824116285, -1.9041023863002897],
                    ['Lee Valley Velopark', 51.55050947022894, -0.01542015959307205],
                    ['The NEC', 52.454370958299464, -1.7170518858434227],
                    ['Sandwell Aquatics Centre', 52.48929802639806, -1.9895367821356418],
                    ['Smithfield', 52.47198389646618, -1.891131355897587],
                    ['Sutton Park', 52.556218598432785, -1.844282242871684],
                    ['University of Birmingham Hockey and Squash Centre', 52.453289713437236, -1.927891507775706],
                    ['Victoria Park', 52.28719972783462, -1.543736627765278],
                    ['Victoria Square', 52.47896135751349, -1.9028046355160046],
                    ['Warwick', 52.280693711307954, -1.5708382082475476],
                    ['West Park', 52.58961464536341, -2.1397746719591275]

                    // ['Beach Roadside Parking', 53.96224617807532, -6.366416213396633],
                    // ['Centra Supermarket', 53.96434169931469, -6.364871261004055],
                    // ['Community Centre', 53.96424702442251, -6.37148022401675],
                    // ['Church', 53.96615970595411, -6.364045143127442]
                ]

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


                locations.map(location =>
                {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(location[LATITUDE], location[LONGITUDE]),
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