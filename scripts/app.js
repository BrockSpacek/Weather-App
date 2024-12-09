import {APIKEY} from './environment.js'



// IDs
let ApiButton = document.getElementById('ApiButton');
let currentDayTemp = document.getElementById('currentDayTemp');
let highLowTemp = document.getElementById('highLowTemp');










// Geo Location

navigator.geolocation.getCurrentPosition(success);

{
    coords: {
        latitude: 37.9577;
        longitutde: -121.2908;
    }
}


// Functions 


function success(position){
    console.log(position)
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitute: " + position.coords.longitude);

}


// function errorFunc(){
//    console.log(error.message);
// }

ApiButton.addEventListener('click', function(event){
    apiCallWeather();
    apiCallFiveDay();
});

 function apiCallWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=38.1341&lon=-121.2722&appid=${APIKEY}`)
    .then((response) => { 
        return response.json()

    })
    .then((data) => {
        console.log(data);
    })
}


function apiCallFiveDay(){
    fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid=${APIKEY}`)
    .then((response) => { 
        return response.json()

    })
    .then((data) => {
        console.log(data);
    })
}


