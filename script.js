var apiKey = "196df1c55f3df94443139756f2fc08c6";

function addClickers() {
  document
    .getElementById("btnGetWeather")
    .addEventListener("click", getWeather());
}

// function getCoordinates() {
//   var city = document.getElementById("city").value;
//   console.log(city);
//   var apiURLCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
//   fetch(apiURLCoordinates)
//     .then((resp) => {
//       if (!resp.ok) throw new Error(resp.statusText);
//       return resp.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(data[0].lat);
//       console.log(data[0].lon);
//       var lat = data[0].lat;
//       var lon = data[0].lon;
//       console.log(lat);
//       console.log(lon);
//       getWeather(data);
//     })
//     .catch(function () {
//       console.log(Error);
//     });
// }

// getCoordinates();

function getWeather() {
  var city = document.getElementById("city").value;
  console.log(city);
  var apiURLCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  fetch(apiURLCoordinates)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      var language = "en";
      var units = "imperial";
      var apiURLWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;
      fetch(apiURLWeather)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          displayWeather(data);
        })
        .catch(function () {
          console.log(Error);
        });
    })
    .catch(function () {
      console.log(Error);
    });
}
//   var language = "en";
//   var units = "imperial";
//   var apiURLWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;
//   fetch(apiURLWeather)
//     .then((resp) => {
//       if (!resp.ok) throw new Error(resp.statusText);
//       return resp.json();
//     })
//     .then((data) => {
//       displayWeather(data);
//     })
//     .catch(function () {
//       console.log(Error);
//     });
// }

function displayWeather(resp) {
  console.log(resp);
  console.log(city.value);
  var todaysWeather = document.querySelector(".today");
  var todaysDate = new Date(resp.current.dt * 1000);
  todaysWeather.innerHTML = `<div class="current-city">
    Current Weather in ${city.value}  <br />
    on ${todaysDate} <br>
    <img src="http://openweathermap.org/img/wn/10d@4x.png"> <br>
    Temp: ${resp.current.temp} ℉<br />
    Wind: ${resp.current.wind_speed} mph<br />
    Humidity: ${resp.current.humidity}% <br />
    UV Index: ${resp.current.uvi}<br />`;

  var futureWeather = document.querySelector(".future");
  futureWeather.innerHTML = resp.daily
    .map((day, idx) => {
      if (idx <= 4) {
        console.log(day);
        var dt = new Date(day.dt * 1000);
        return `<div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${dt.toDateString()}</h5>
        <img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png"> <br>
        <p class="card-text">
          Temp: ${day.temp.day} ℉<br />
          Wind: ${day.wind_speed} mph<br />
          Humidity: ${day.humidity}%<br />
        </p>
      </div>
    </div>`;
      }
    })
    .join("");
}

addClickers();
getWeather();
