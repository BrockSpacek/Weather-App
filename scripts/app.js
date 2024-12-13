import {APIKEY} from './environment.js';
import {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "./localstorage.js"


// Notes that I want to add for tonight and Friday

// Make sure Data populates when page loads in for current location
// Finish up Local Storoage
// Finish up Day Time, Night Time, and Cloudy/Rainy Modes


// IDs


let ApiButton = document.getElementById('ApiButton');
let currentDayTemp = document.getElementById('currentDayTemp');
let highLowTemp = document.getElementById('highLowTemp');
let searchCity = document.getElementById('searchCity');
let searchDate = document.getElementById('searchDate');
let searchTime = document.getElementById('searchTime');
let weatherType = document.getElementById('weatherType');

let searchInput = document.getElementById('searchInput');
let addFavoriteBtn = document.getElementById('addFavoriteBtn')

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

let lat = "";
let lon = "";
let previousMinutes = -1;

let mainCardColor = document.getElementById('mainCardColor');
let favoriteCardColor = document.getElementById('favoriteCardColor');



// Geo Location

async function geoLocation(location) {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKEY}`);
    const geoData = await promise.json();
    return geoData
}


navigator.geolocation.getCurrentPosition(success);


async function success(position){
    console.log(position)
    lat = position.coords.latitude
    lon = position.coords.longitude
   
    let dataWeather = await apiCallWeather(lat, lon);
    const fiveDayWeatherData = await apiCallFiveDay(lat, lon);
    searchFunction(fiveDayWeatherData, dataWeather);
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
  console.log
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


searchInput.addEventListener('keydown', async function(event){

if(event.key == 'Enter'){
  let location = searchInput.value 
  let geoData = await geoLocation(location);
  let dataWeather = await apiCallWeather(geoData[0].lat, geoData[0].lon);
  const fiveDayWeatherData = await apiCallFiveDay(geoData[0].lat, geoData[0].lon);
  searchFunction(fiveDayWeatherData, dataWeather);
}

});




// Local Storage(Collabed with Bowen and Juan)




const storedValue = document.getElementById('storedValue');


addFavoriteBtn.addEventListener('click', () => {
  let storageValue = searchInput.value
  saveToLocalStorage(storageValue);
  loadFavorites();
})


async function favoritesLoading(favoritesLocation) {
  let geoData = await geoLocation(favoritesLocation);
  let dataWeather = await apiCallWeather(geoData[0].lat, geoData[0].lon);
  const fiveDayWeatherData = await apiCallFiveDay(geoData[0].lat, geoData[0].lon);
  searchFunction(fiveDayWeatherData, dataWeather);
}

loadFavorites();


async function loadFavorites() {
  const storedFavorites = getFromLocalStorage();
  
  storedValue.innerHTML = ''; 
  
  storedFavorites.forEach(favorites => {
    let pTag = document.createElement('p');
    let removeButton = document.createElement('button');
    removeButton.innerText = "X";
    removeButton.className = "removeBtn";
    
    removeButton.addEventListener('click', () => {
      removeFromLocalStorage(favorites); 
      pTag.remove(); 
    });
    
    pTag.innerText = favorites;
    
    pTag.addEventListener('click', function() {
      favoritesLoading(favorites);  
    });
    
    pTag.appendChild(removeButton);
    storedValue.appendChild(pTag);  
  });
}



// Date and Time ( Help from Tanush )
function updateClock() {
    const now = new Date();
    let day = now.getDate();
    let today = now.getDay();
    let month = now.toLocaleString("default", { month: "short" });
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const meridiem = hours >= 12 ? "PM" : "AM";
    let displayHours = hours % 12 || 12;
  
    const week = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    dayOneWeather.innerText = week[(today) % 7];
    dayTwoWeather.innerText = week[(today + 1) % 7];
    dayThreeWeather.innerText = week[(today + 2) % 7];
    dayFourWeather.innerText = week[(today + 3) % 7];
    dayFiveWeather.innerText = week[(today + 4) % 7];
    
  
  
    if (minutes !== previousMinutes) {
      searchDate.innerText = `${month} ${day}, `;
      searchTime.innerText = `${displayHours}:${minutes}${meridiem}`;
  
      previousMinutes = minutes;
    }

    const body = document.querySelector('body');
    const isNightTime = hours >= 18 || hours < 6;
    
  
    if (!isNightTime) {
      body.className = "bg-day";
      mainCardColor.className = "container forecast-card-day";
      favoriteCardColor.className = "favorites-bg-day text-center";
      addFavoriteBtn.className = "weather-text button-text-day"
    } else if (isNightTime){
      body.className = "bg-night";
      mainCardColor.className = "container forecast-card-night white-text";
      favoriteCardColor.className = "favorites-bg-night text-center white-text";
      addFavoriteBtn.className = "weather-text button-text-night white-text"
      
    }
   
}

  setInterval(updateClock, 1000);