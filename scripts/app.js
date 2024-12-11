import {APIKEY} from './environment.js';

// Notes that I want to add for next day

// Use Switch Statements on the current day and 5 day forecast to change the icons, temps.
// If its cloudy, rainy, switch to the gray panel, if its night, switch too purple panel, and if its day switch to Yellow Panel
// For High Low, use variable to compare lowest and highest values in the current day so that it will display. 


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

// Help from Tanush
function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    let day = now.getDate();
    let month = now.toLocaleString("default", { month: "short" });
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const suffix = (day) => {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    if (minutes !== previousMinutes) {
      searchDate.innerText = `${month} ${day}${suffix(day)}, ${year}`;
      searchTime.innerText = `${hours}:${minutes}${meridiem}`;
      console.log(` ${month}/${day}/${year} ${hours}:${minutes}.`);
      previousMinutes = minutes;
    }
  }
  setInterval(updateClock, 1000);
