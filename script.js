(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h > 12) {
                h -=12;
            }
            if(h === 0){
                h = 12;
            }
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    document.getElementById("form").addEventListener("submit", validateForm);
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;

        }  else {
            let tarneHind = 0;
            switch (linn.value) {
                case "tln":
                    tarneHind = 0;
                    break;
                case "trt":
                case "nrv":
                    tarneHind = 2.5;
                    break;
                case "prn":
                    tarneHind = 3;
                    break;
                default:
                    tarneHind = 0;
                    break;
            }
            // kingitus
            if (document.getElementById("v1").checked) {
                tarneHind += 5; 
            }
            // kontaktivaba tarne
            if (document.getElementById("v2").checked) {
                tarneHind += 1; 
            }
            // kuvame hinna
            e.innerHTML = tarneHind.toFixed(2) + " &euro;";
        }
        console.log("Tarne hind on arvutatud");
    }

    function validateForm(event) {
        event.preventDefault();
        
        const firstName = document.getElementById("fname").value;
        const lastName = document.getElementById("lname").value;
        const namePattern = /^[A-Za-z\s]+$/; 

        if (firstName === "" || !namePattern.test(firstName)) {
            alert("Eesnimi ei tohi olla tühi ega sisaldada numbreid.");
            return false;
        }

        if (lastName=== "" || !namePattern.test(lastName)) {
            alert("Perekonnanimi ei tohi olla tühi ega sisaldada numbreid.");
            return false;
        }

        const tavaline = document.getElementById('tavaline');
        const kiire = document.getElementById('kiire');

        if (!tavaline.checked && !kiire.checked) {
            alert("Palun valige tarnetüüp.");
            return false;
        }

        return true;
    }
    
})();

// map

let mapAPIKey = "Aq33oB68Qo5pVbO71YuDCDOXAlLpF_8c8Sqb1Yb6n3zlyAbJUiDuDT5pabqwhYyD";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let centerPoint2 = new Microsoft.Maps.Location(
        59.43883026762243, 24.77138359778318 
        );
    
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: (centerPoint+centerPoint2)/2,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
            title: 'Tallinna Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let infobox1 = new Microsoft.Maps.Infobox(centerPoint, {
            title: 'Tartu Ülikool',
            description: 'Siin asub Tartu Ülikool',
        });
        
    let infobox2 = new Microsoft.Maps.Infobox(centerPoint2, {
            title: 'Tallinna Ülikool',
            description: 'Siin asub Tallinna Ülikool',
        });
    
    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
            map.entities.push(infobox1);
        });
    
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
            map.entities.push(infobox2);
        });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

