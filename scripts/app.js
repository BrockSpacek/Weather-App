import {APIKEY} from './environment.js'


navigator.geolocation.getCurrentPosition(success);

{
    coords: {
        latitude: 37.7749;
        longitutde: -122.4194;
    }
}

function success(position){
    console.log(position)
    console.log("Our latitude is: " + position.coords.latitude);
    console.log("Our longitude is: " + position.coords.longitude);
    console.log("Now we know where you are!");
}


// function errorFunc(){
//    console.log(error.message);
// }

/* function apiCall(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=38.1341&lon=-121.2722&appid=${APIKEY}`)
    .then((response) => { 
        return response.json()

    })
    .then((data) => {
        console.log(data);
    })
}

apiCall();

*/