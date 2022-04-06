window.onload = () =>
            {
                // These constants must start at 0
                // These constants must match the data layout in the 'locations' array below
                const CONTENT = 0,
                    LATITUDE = 1,
                    LONGITUDE = 2

                let locations = [
                    ['Beach Roadside Parking', 53.96224617807532, -6.366416213396633],
                    ['Centra Supermarket', 53.96434169931469, -6.364871261004055],
                    ['Community Centre', 53.96424702442251, -6.37148022401675],
                    ['Church', 53.96615970595411, -6.364045143127442]
                ]

                let map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 16,
                    center: new google.maps.LatLng(53.96393775160952, -6.369076964739406),
                    mapTypeId: google.maps.MapTypeId.ROADMAP                   
                })                               

                let infoWindow = new google.maps.InfoWindow()

                let icon = {
                    url: "../images/argos.png", // url
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