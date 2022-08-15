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
  var todaysWeather = document.querySelector(".today");
  todaysWeather.innerHTML = `<div class="current-city">
    City Name:  <br />
    Temp: ${resp.daily[0].temp.day} ℉<br />
    Wind: ${resp.daily[0].wind_speed} mph<br />
    Humidity: ${resp.daily[0].humidity}% <br />
    UV Index: ${resp.daily[0].uvi}<br />`;
}

addClickers();
getWeather();
