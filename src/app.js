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
  let wind = document.querySelector ("#wind");
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector ("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  console.log(response.data)
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

