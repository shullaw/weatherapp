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

      weatherLink.href = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=9d65df0e73d8ab48d9ea132aaa9a6324&units=${geoWeatherMe.unit}`;
      weatherLocation.textContent = '';
      locationLink.href = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9d65df0e73d8ab48d9ea132aaa9a6324&units=${geoWeatherMe.unit}`;
      
      (async () => {
        const res = await fetch(locationLink.href, {
          headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        console.log(json['name']);
        document.querySelector('.location').innerHTML = `${json['name']}`;
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
    (async () => {
      const res = await fetch(weatherLink.href, {
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      Object.entries(json["daily"]).forEach(([key, value]) => {
        if (key != "weather") {
        console.log(`${key}:${value}`);
        }

      });
    })();

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