   


        let now = new Date();


        function formatDate(mydate) {
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
            if (hour < 10) {
                hour = `0${hour}`
            }
            let minute = mydate.getMinutes();
            if (minute < 10) {
                minute = `0${minute}`
            }
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




        // Format days for forecast 
        // timestamp is sent here from the "forecastDay.dt" - see below - then the function
        // takes this timestamp and does the calculation, dfines the current date and goes through an array


        function formatForecastDays(timestamp) {
            let date = new Date(timestamp * 1000);
            let day = date.getDay();
            let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return days[day];
        }



        // API
        // displaying weekly forecast here - manipulate html with js 
        function displayForecast(response) {
            let forecastDays = response.data.daily;
            let forecastElement = document.querySelector("#weeklyForecast");


            let forecastHTML = `<div class="row">`;
            // Looping through days from daily forecast
            forecastDays.forEach(function (forecastDay, index) {



                if (index < 6) {

                    forecastHTML = forecastHTML + `
                
                <div class="col">
                    <div class="forecast-date">${formatForecastDays(forecastDay.dt)}</div>
                  
                    <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png");width="42" />
                    <div class="forecast-temperatures">
                        <span class="forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
                         <span class="forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
                        </div>
                         </div>`;
                }
            });
            forecastHTML = forecastHTML + `</div>`;

            forecastElement.innerHTML = forecastHTML;


        }

        // Getting weekly forecast - making an api call
        function getForecast(coordinates) {

            let apiKey = "3980a7c8f2a782241a093131b099f993";
            apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;


            axios.get(apiUrl).then(displayForecast);


        }





        function displayWeather(response) {

            celsiusTemperature = response.data.main.temp;


            document.querySelector("#city").innerHTML = response.data.name;
            document.querySelector("#temperature").innerHTML = Math.round(
                response.data.main.temp
            );
            document.querySelector("#temperature-description").innerHTML =
                response.data.weather[0].description;
            document.querySelector("#humidity").innerHTML =
                response.data.main.humidity

            document.querySelector("#wind").innerHTML =
                Math.round(response.data.wind.speed);

            // Getting weather icon
            let iconElement = document.querySelector("#weather-icon");
            iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
            iconElement.setAttribute("alt", response.data.weather[0].description);
            // Changin  keyvisual 

            if (response.data.main.temp < -1) {
                let keyVisual = document.querySelector(".keyvisual");
                keyVisual.setAttribute("src", "src/undraw_Powerful_re_frhr.svg");
            }

            if (response.data.main.temp > 1) {
                let keyVisual = document.querySelector(".keyvisual");
                keyVisual.setAttribute("src", "src/undraw_My_universe_re_txot.svg");
            }

            if (response.data.main.temp > 11) {
                let keyVisual = document.querySelector(".keyvisual");
                keyVisual.setAttribute("src", "src/undraw_Hiking_re_k0bc.svg");
            }

            if (response.data.main.temp > 16) {
                let keyVisual = document.querySelector(".keyvisual");
                keyVisual.setAttribute("src", "src/undraw_Floating_re_xtcj.svg");
            }

            celsius.classList.add("active");
            fahrenheit.classList.remove("active");



            getForecast(response.data.coord);




        }

        function searchCity(city) {

            let apiKey = "3980a7c8f2a782241a093131b099f993";

            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            axios.get(apiUrl).then(displayWeather);
            console.log(apiUrl);
        }


        // UNIT Conversion 
        //  VERIABLES FOR UNITS
        let temperature = document.querySelector("#temperature");


        let celsius = document.querySelector("#celsius-link");
        celsius.addEventListener("click", changetoCelsius);

        let fahrenheit = document.querySelector("#fahrenheit-link");
        fahrenheit.addEventListener("click", changetoFahrenheit);
        //  VERIABLES FOR UNITS END


        //  FUNCTIONS FOR UNITS
        function changetoCelsius(event) {
            event.preventDefault;
            celsius.classList.add("active");
            fahrenheit.classList.remove("active");

            temperature.innerHTML = Math.round(celsiusTemperature);
        }

        function changetoFahrenheit(event) {
            event.preventDefault;

            // remove the "active" class from the celsius link
            celsius.classList.remove("active");
            fahrenheit.classList.add("active");
            let farenheitTemp = (celsiusTemperature * 9 / 5) + 32;
            let temperature = document.querySelector("#temperature");
            temperature.innerHTML = Math.round(farenheitTemp);
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

        let celsiusTemperature = null;

        let searchForm = document.querySelector("#search");
        searchForm.addEventListener("submit", handleSubmit);

        let currentLocation = document.querySelector("#current-location");
        currentLocation.addEventListener("click", getCurrent);

        searchCity("Suprunivka");






 