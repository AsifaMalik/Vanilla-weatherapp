
function formatDate(timestamp) {
  let actualDate = new Date (timestamp);
  let hours = actualDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = actualDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[actualDate.getDay()];
  return `${day} ${hours}:${minutes}`;
}
let actualDate = new Date();
let timeDate = document.querySelector("#currentTime");
timeDate.innerHTML = formatDate(actualDate);

function showWeather(response) {
  console.log(response);
let cityElement =  document.querySelector("#show-city");
let temperatureElement = document.querySelector(".currentTemp");
let descriptionElement = document.querySelector(".weatherDescription");
let humidityElement = document.querySelector("#detailHumidity");
let windElement = document.querySelector("#detailWind");
let dateElement = document.querySelector("#currentTime");
let iconElement = document.querySelector("#icon");
let tempMax = document.querySelector("#tempMax");
let tempMin = document.querySelector("#tempMin");

tempMax.innerHTML = `${Math.round(response.data.main.temp_max)} ⇡`;
tempMin.innerHTML = `${Math.round(response.data.main.temp_min)} ⇣`;

celsiusTemperature = response.data.main.temp;
cityElement.innerHTML = response.data.name ;
temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°` ;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = `${response.data.main.humidity}%`;
windElement.innerHTML = `${Math.round(response.data.wind.speed)} Km/H`;
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

}

// 1. Make an API call to OpenWeather API
// 2. Once I get HTTP repsonse, we display the city name and temperature

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  let mainCity = document.querySelector("#show-city");
  mainCity.innerHTML = `${cityInput.value}`;
  search(cityInput.value);
}

let formInput = document.querySelector("#searchingForm");
formInput.addEventListener("submit", searchCity);
function search(city) {
  let apiKey = "083f1c2f492b6f9e7ae05eb7c7f612e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//function actualPosition(position) {
 // let lat = position.coords.latitude;
  //let lon = position.coords.longitude;
  //let apiKey = "083f1c2f492b6f9e7ae05eb7c7f612e2";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(showWeather);
//}

//function getPosition(event) {
//  event.preventDefault();
  //navigator.geolocation.getCurrentPosition(actualPosition);
//}


//let currentCity = document.querySelector("#currentLocation");
//currentCity.addEventListener("click", getPosition);
function displayFahrenheitTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector (".currentTemp");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

let fahrenheitTemperature =(celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector (".currentTemp");
temperatureElement.innerHTML = Math.round(celsiusTemperature);

}


let celsiusTemperature = null;

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Murcia");


