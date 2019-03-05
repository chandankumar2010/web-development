window.addEventListener('load',()=>{
    const temperatureDescription  = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimeZone = document.querySelector(".location-timezone");
    
    function setIcon(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = iconID.replace(/-/g, "_").toUpperCase();
        skycons.add(icon,Skycons[currentIcon]);
        skycons.play();
    
    }

    function roundNumber(num){
        return  +(Math.round(num + "e+2")  + "e-2");
    }

    function temperatureToCelcius(temperature){
        const tempCelcius = (temperature - 32) * 5/9;
        return roundNumber(tempCelcius);
    }

    function changeTemperatureUnit(temperature){
        const degreeeSectionSpan = document.querySelector('.degree-section span');
        document.querySelector('.degree-section').addEventListener('click',() =>{
            if(degreeeSectionSpan.textContent === "F"){
                degreeeSectionSpan.textContent = 'C';
                temperatureDegree.textContent = temperatureToCelcius(temperature);
            }else{
                degreeeSectionSpan.textContent = 'F'
                temperatureDegree.textContent = temperature
            }
        });
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4ae85346dc3cca23018107580481e7fd/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    //set DOM elements from API

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    //set Icon
                    setIcon(document.getElementById("icon"), icon );
                    changeTemperatureUnit(temperature);
                });
        });
    }

    

});