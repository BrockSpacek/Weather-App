import {APIKEY} from './environment.js';

// Notes that I want to add for next day

// Use Switch Statements on the current day and 5 day forecast to change the icons, temps.
// If its cloudy, rainy, switch to the gray panel, if its night, switch too purple panel, and if its day switch to Yellow Panel
// For High Low, use variable to compare lowest and highest values in the current day so that it will display. 


// IDs

let previousMinutes = -1;

let ApiButton = document.getElementById('ApiButton');
let currentDayTemp = document.getElementById('currentDayTemp');
let highLowTemp = document.getElementById('highLowTemp');
let searchCity = document.getElementById('searchCity');
let searchDate = document.getElementById('searchDate');
let searchTime = document.getElementById('searchTime');
let weatherType = document.getElementById('weatherType');

let searchInput = document.getElementById('searchInput');

let dayTwoWeather = document.getElementById('dayTwoWeather');
let dayThreeWeather = document.getElementById('dayThreeWeather');
let dayFourWeather = document.getElementById('dayFourWeather');
let dayFiveWeather = document.getElementById('dayFiveWeather');
let dayOneWeather = document.getElementById('dayOneWeather');

let imageDayTwo = document.getElementById('imageDayTwo');
let imageDayThree = document.getElementById('imageDayThree');
let imageDayFour = document.getElementById('imageDayFour');
let imageDayFive = document.getElementById('imageDayFive');
let imageDayOne = document.getElementById('imageDayOne');






// Geo Location

async function geoLocation(location) {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKEY}`);
    const geoData = await promise.json();
    return geoData
}



// API 

async function apiCallWeather(lat, lon){
  const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
  const dataWeather = await promise.json();
  return dataWeather;

}

async function apiCallFiveDay(lat, lon){
  const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
  const fiveDayWeatherData = await promise.json();
  return fiveDayWeatherData;

}

ApiButton.addEventListener('click', function(event){
    apiCallWeather();
    apiCallFiveDay();
});

 

// Search (Collabed with Bowen)
function searchFunction(fiveDayWeatherData, dataWeather){
  console.log(fiveDayWeatherData, dataWeather);
  const kelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9/5 + 32).toFixed(0);
  let temp = kelvinToFahrenheit(dataWeather.main.temp);
  currentDayTemp.innerText = `${temp}°F`;
  let high = kelvinToFahrenheit(dataWeather.main.temp_max);
  let low = kelvinToFahrenheit(dataWeather.main.temp_min);
  highLowTemp.innerText = `H: ${high}°F L: ${low}°F`;
  searchCity.innerText = `${dataWeather.name}`;
  weatherType.innerText = `${dataWeather.weather[0].description}`
  imageDayOne.src = `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;
  imageDayTwo.src = `http://openweathermap.org/img/wn/${fiveDayWeatherData.list[12].weather[0].icon}@2x.png`;
  imageDayThree.src = `http://openweathermap.org/img/wn/${fiveDayWeatherData.list[20].weather[0].icon}@2x.png`;
  imageDayFour.src = `http://openweathermap.org/img/wn/${fiveDayWeatherData.list[28].weather[0].icon}@2x.png`;
  imageDayFive.src = `http://openweathermap.org/img/wn/${fiveDayWeatherData.list[36].weather[0].icon}@2x.png`;

}


// HTML and Local Storage Functions 
searchInput.addEventListener('keydown', async function(event){

if(event.key == 'Enter'){
  let location = searchInput.value 
  let geoData = await geoLocation(location);
  let dataWeather = await apiCallWeather(geoData[0].lat, geoData[0].lon);
  const fiveDayWeatherData = await apiCallFiveDay(geoData[0].lat, geoData[0].lon);
  searchFunction(fiveDayWeatherData, dataWeather);
}

});




// Date and Time ( Help from Tanush )
function updateClock() {
    const now = new Date();
    let day = now.getDate();
    let today = now.getDay();
    let month = now.toLocaleString("default", { month: "short" });
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  
    const week = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];

    dayOneWeather.innerText = week[(today) % 6];
    dayTwoWeather.innerText = week[(today + 1) % 6];
    dayThreeWeather.innerText = week[(today + 2) % 6];
    dayFourWeather.innerText = week[(today + 3) % 6];
    dayFiveWeather.innerText = week[(today + 4) % 6];
    
  
  
    if (minutes !== previousMinutes) {
      searchDate.innerText = `${month} ${day}${suffix(day)}, `;
      searchTime.innerText = `${hours}:${minutes}${meridiem}`;
  
      previousMinutes = minutes;
    }
  }

  setInterval(updateClock, 1000);