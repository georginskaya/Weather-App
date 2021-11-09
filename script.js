//  VERIABLES FOR UNITS
let temperature = document.querySelector("#temperature");
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changetoCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changetoFahrenheit);
//  VERIABLES FOR UNITS END

let now = new Date();

function formatDate(mydate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[mydate.getDay()]; //  returns a value between 0 and 6
  //   inside the [] is a value (index) that .getDay is returning

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[mydate.getMonth()];

  let date = mydate.getDate();
  let hour = mydate.getHours();
  let minute = mydate.getMinutes();
  let year = mydate.getFullYear();

  let formattedDate = document.querySelector(".date");
  formattedDate.innerHTML = `${day} ${month} ${date}, ${year} | ${hour}:${minute}`;

  return formattedDate;
}

//   here you are starting the function by sending the "now" as a "my date" parameter
formatDate(now);

// SEARCH FUNCTION

//  targetting search button
let form = document.querySelector("#search");
form.addEventListener("submit", search);

function search(event) {
  // with preventDefault it is not going to reload the page
  event.preventDefault();
  //     THIS  is where u r storing the value in the console
  let searchInput = document.querySelector("#search-input");

  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please type smth");
  }
}

//  FUNCTIONS FOR UNITS
function changetoCelsius(event) {
  event.preventDefault;
  temperature.innerHTML = "19";
}

function changetoFahrenheit(event) {
  event.preventDefault;
  temperature.innerHTML = "66";
}

// API
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "3980a7c8f2a782241a093131b099f993";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

//  getting current location

function getCurrent(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "3980a7c8f2a782241a093131b099f993";

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrent);

searchCity("Suprunivka");
