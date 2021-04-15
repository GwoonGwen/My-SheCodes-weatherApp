function currentDate(date) {
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Oct",
  "Nov",
  "Dec"
];
let today = days[date.getDay()];
let dateNr = date.getDate();
let thisMonth = months[date.getMonth()];

return `${today} ${dateNr} ${thisMonth}`;
}

function currentTime(time) {
  let hour = time.getHours();
  let minutes = time.getMinutes();
  
  return `${hour}:${minutes}`;
}

function cityInputWeather(response) {
  document.querySelector("#city-main").innerHTML = response.data.name;
  document.querySelector("#humid-value").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind-value").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-view").innerHTML = response.data.weather[0].description;
  document.querySelector("#temp-main").innerHTML = Math.round(response.data.main.temp);
  }

function cityUserInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city").value.toLowerCase().replace("?", "").replace("/", "").replace("-", "").replace("!", "").replace("&", "").trim();
  let apiKey = "b6ea7199b1cb9aca54197fcbaab59e85";
  let units = "metric";
  let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${mainUrl}q=${cityInput}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(cityInputWeather)
}

function searchPosition(position) {
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let apiKey = "b6ea7199b1cb9aca54197fcbaab59e85";
let units = "metric";
let mainUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiUrl = `${mainUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(cityInputWeather)
}

function pinpointCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let now = new Date(); 

let dateToday = document.querySelector("#today-date").innerHTML = currentDate(now);

let timeToday = document.querySelector("#today-time").innerHTML = currentTime(now);

//let fahrenheitMain = document.querySelector("#fahrenheit-main");
//fahrenheitMain.addEventListener("click", fahrenheitConverter);

//let celsiusMain = document.querySelector("#celsius-main");
//celsiusMain.addEventListener("click", celsiusConverter);

let cityInput = document.querySelector("#submit-form");
cityInput.addEventListener("submit", cityUserInput);

let pinpoint = document.querySelector("#pinpoint-button");
pinpoint.addEventListener("click", pinpointCity);




