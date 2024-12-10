import {APIKEY} from './environment.js';

// Notes that I want to add for next day

// Use Switch Statements on the current day and 5 day forecast to change the icons, temps.
// If its cloudy, rainy, switch to the gray panel, if its night, switch too purple panel, and if its day switch to Yellow Panel


// IDs
let ApiButton = document.getElementById('ApiButton');
let currentDayTemp = document.getElementById('currentDayTemp');
let highLowTemp = document.getElementById('highLowTemp');
let searchCity = document.getElementById('searchCity');
let searchDate = document.getElementById('searchDate');
let searchTime = document.getElementById('searchTime');
let dayTwoWeather = document.getElementById('dayTwoWeather');
let dayThreeWeather = document.getElementById('dayThreeWeather');
let dayFourWeather = document.getElementById('dayFourWeather');
let dayFiveWeather = document.getElementById('dayFiveWeather');
let daySixWeather = document.getElementById('daySixWeather');
let daySevenWeather = document.getElementById('daySevenWeather');
let imageDayTwo = document.getElementById('imageDayTwo');
let imageDayThree = document.getElementById('imageDayThree');
let imageDayFour = document.getElementById('imageDayFour');
let imageDayFive = document.getElementById('imageDayFive');
let imageDaySix = document.getElementById('imageDaySix');
let imageDaySeven = document.getElementById('imageDaySeven');





// Geo Location

navigator.geolocation.getCurrentPosition(success);

{
    coords: 
    {
        latitude: 37.9577;
        longitutde: -121.2908;
    }
}
function success(position){
    console.log(position)
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitute: " + position.coords.longitude);

}


// function errorFunc(){
//    console.log(error.message);
// }

// API 

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




// HTML and Local Storage Functions 
searchBarBtn.addEventListener('click', function(){



});




// Workshop Functions that are not finished

import {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "../localStorage.js";

const inputField = document.getElementById('storageInput');
const addToStorageBtn = document.getElementById('addToStorageBtn');
const getFromStorageBtn = document.getElementById('getFromStorageBtn');
const storedValue = document.getElementById('storedValue');

addToStorageBtn.addEventListener('click', function(){
    let userInput = inputField.value;
    saveToLocalStorage(userInput);
});

getFromStorageBtn.addEventListener('click', function(){
    createElements();
});

function createElements(){
    let cityNames = getFromLocalStorage();
    console.log(cityNames);

    studentNames.map(cities => {
        console.log(cities)

        let p = document.createElement('p');

        p.innerText = cities;

        let removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = "btn btn-danger";
        removeButton.innerText = "X";

        removeButton.addEventListener('click', function(){
            removeFromLocalStorage(cities);
            p.remove();
        })

        p.appendChild(removeButton);

        storedValue.appendChild(p);
    });
}


