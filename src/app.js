let now = new Date ();
let h4 = document.querySelector (".date");

let hours = now.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]
let day = days[now.getDay()];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];


h4.innerHTML = `${hours}:${minutes}, ${day} ${date} ${month} ${year}`


function showTemperature(response) {
  let temperature = document.querySelector (".temperature")
  temperature.innerHTML = Math.round(response.data.main.temp);
  let icon = document.querySelector ("#icons");
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let wind = document.querySelector ("#wind");
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector ("#humidity");
  humidity.innerHTML = response.data.main.humidity;
 let description = document.querySelector ("#describe");
 description.innerHTML = response.data.weather[0].description;

}



function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h2 = document.querySelector (".city");
  h2.innerHTML = `${city}`;
  
let apiKey = "50c2acd53349fabd54f52b93c8650d37";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector (".city-search");
form.addEventListener("submit", search);

function showCTemperature (response){
  let temperature =Math.round (response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
}


function showPosition(position) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCTemperature);
}
navigator.geolocation.getCurrentPosition(showPosition);



function displayForecast() {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector ("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"]
  days.forEach(function (forecastDay){
    forecastHTML = forecastHTML + `
    <div class="col-3">
    <div class="card forecast">
      <div class="card-body">
    <h2 class="card-subtitle mb-3 forecast-text">${forecastDay.dt}</h2>
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="rounded align" id="icons">
    <h2 class="card-subtitle mt-3 mb-4 text forecast-text">${forecastDay.temp}</h2>
    </div>
    </div>
    `;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  })

}
function getForecast(coordinates) {
let apiKey = "50c2acd53349fabd54f52b93c8650d37";
let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
axios.get(apiURL).then(displayForecast)
}


