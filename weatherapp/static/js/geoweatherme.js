// /weatherapp/static/js/geoweatherme.js // THIS ONE IS THE ONE THAT IS BEING CHANGED //
function geoWeatherMe() {
  

  const weatherStatus = document.querySelector('#weather-status');
  const weatherLink = document.querySelector('#weather-link');
  const weatherLocation = document.querySelector('#weather-location');
  const locationLink = document.querySelector('#location-link');

  weatherLink.href = '';
  weatherLink.textContent = '';
  locationLink.href = '';
  locationLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    weatherStatus.textContent = '';



    weatherLink.href = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=a3c53d34ecd943a9517dea09b203f8e0&units=${geoWeatherMe.unit}`;
    weatherLocation.textContent = '';
    locationLink.href = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a3c53d34ecd943a9517dea09b203f8e0&units=${geoWeatherMe.unit}`;

    (async () => {
      const res = await fetch(locationLink.href, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      console.log(json['name']);
      document.querySelector('.location').innerHTML = `${json['name']}`;
    })();

    function reorder(arr, start, end) {
      var newarr1 = arr.splice(start, end);
      var newarr2 = arr.splice(0, start);
      var newarr3 = newarr1.concat(newarr2);
      return newarr3;
    };
    (async () => {
      const res = await fetch(weatherLink.href, {
        headers: { Accept: 'application/json' },
      });
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var date = new Date();
      date = date.toString().slice(0, 3);
      var startDay = days.indexOf(date);
      days = reorder(days, startDay, 7);
      const json = await res.json();
      var deg = "°";
      var js;
        days.forEach(function (day, index) {
          for (var j = 0; j < days.length; j++) {
            js = j.toString();
            days.forEach(function (day, index) {
              document.querySelectorAll(`.card-title${js}`)[0].innerHTML = `${days[j]}`;
              document.querySelectorAll(`.card-title${js}`)[1].innerHTML = `${days[j]}`;
              
            });
          }
        });
      for (var i = 0; i < json["daily"].length - 1; i++) {
        js = i.toString();
        Object.entries(json["daily"][i]["temp"]).forEach(([key, value]) => {
          if (key == "day") {
            var day = days[date];
            document.querySelectorAll(`.card-day` + i)[0].innerHTML = `${value}` + deg;
            document.querySelectorAll(`.card-day` + i)[1].innerHTML = `${value}` + deg;
          }

        });
      };
    })();


    (async () => {
      const res = await fetch(weatherLink.href, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      Object.entries(json["current"]).forEach(([key, value]) => {
        if (key != "weather") {
          var button = document.querySelector('.weather');
          if (button) {
            document.querySelector('.weather').replaceWith(document.querySelector('.weather'))
          }
          if (key == "temp") {
            let deg = "°";
            let temp_deg = `${value}${deg}`;
            button.innerHTML = temp_deg;
            if (geoWeatherMe.unit == "imperial") {
              button.innerHTML = [temp_deg, "F"].join(' ');
            }
            else {
              button.innerHTML = [temp_deg, "C"].join(' ');
            }
          }
          else if (key == "sunset" || key == "sunrise" || key == "dt") {
            var p = document.querySelector(".weather");
            p.innerHTML = `${timeConvert(value)}`;
            if (key == "sunrise") {
              document.querySelector(".sunrise").children[2].innerText = `${timeConvert(value)}`;
            }
            else if (key == "sunset") {
              document.querySelector(".sunset").children[2].innerText = `${timeConvert(value)}`;
            }
            else if (key == "dt") {
              document.querySelector(".date").innerHTML = `${timeConvert(value)}`;
            }
          }
          else if (key == "feels_like") {
            document.querySelector(".temperature").children[2].innerHTML = `${value}` + "°";
          }
          else if (key == "visibility") {
            document.querySelector(".visibility").children[2].innerHTML = `${value}`;
          }
          else if (key == "humidity") {
            document.querySelector(".humidity").children[2].innerHTML = `${value}%`;
          }
          else if (key == "wind_speed") {
            if (geoWeatherMe.unit == "imperial") {
              let wind_unit = "mph";
              document.querySelector(".wind").children[2].innerHTML = `${value} ${wind_unit}`;
            }
            else {
              let wind_unit = "kph";
              document.querySelector(".wind").children[2].innerHTML = `${value} ${wind_unit}`;
            }
          }
        }
      });
    })();
  }

  function error() {
    weatherStatus.textContent = 'Unable to retrieve your weather';
  }


  if (!navigator.geolocation) {
    weatherStatus.textContent = 'Geolocation is not supported by your browser';
  } else {
    weatherStatus.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', geoWeatherMe);
  geoWeatherMe.unit = "imperial";
} else {  // `DOMContentLoaded` has already fired
  geoWeatherMe();
}