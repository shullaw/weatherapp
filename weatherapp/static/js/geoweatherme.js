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
        else if (key == "weather") {
          // console.log(value[0]['id'].toString().slice(0,1));
          // var id = value[0]['id'].toString().slice(0,1);
          var id = value[0]['id'].toString();          
          console.log(id);
          console.log(key,value);
          if (id == 801 || id == 802 || id == 803 || id == 804) {
            // document.querySelector(".weather").innerHTML = "Cloudy";
            // document.querySelector('.weather-aspect').style.background = "radial-gradient(circle, rgba(251,126,63,1) 0%, rgba(252,241,70,1) 100%)";
            document.querySelector('.current-weather-image').innerHTML = document.querySelector('.current-weather-image').innerHTML +`
            <svg class="overcast-clouds" preserveAspectRatio="X200Y200 meet" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 82.6 52.3" style="enable-background:new 0 0 82.6 52.3;" xml:space="preserve">
        <g id="Layer_1">
          <path class="cloud-still" d="M21.8,24.2c0.1,0,0.3-1.1,0.4-1.2c0.5-1.2,1.1-2.4,1.8-3.4c3.9-5.7,12.6-7.1,18.2-3.1c0,0,3.7-6,11-5.9
            c0,0,5.6-0.6,10.3,4.9c0,0,2.8,3.3,2.9,7.4c0,0,3.2-0.5,5.4,1c0,0,6.2,2.6,5.9,10.8H56.3c0,0-2-3.5-7.3-3.6c0.2,0-0.5-2.2-0.6-2.4
            c-1.4-4.4-5.5-6.9-9.9-7.4c-3.4-0.4-6.6,0.8-9,3.2c-0.1,0.1-1.2,1.3-1.2,1.3S25.3,23.6,21.8,24.2z"/>
          <path class="cloud-still" d="M57.6,40.7c0-4.8-3.9-8.6-8.6-8.6c-0.2,0-0.4,0-0.6,0.1c-0.1-0.8-0.2-1.7-0.4-2.4c-0.3-1-0.8-2-1.4-2.9
            c-2-2.9-5.3-4.8-9-4.8c-2.3,0-4.4,0.7-6.1,1.9c-0.6,0.4-1.1,0.8-1.6,1.3c-0.2,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.4,0.5-0.6,0.8
            c-1.8-1.2-3.9-1.9-6.2-1.9c-5.5,0-10,4-10.8,9.3c-3.5,1-6.1,3.9-6.6,7.6h26.3h12.7h12.9h0.7C57.6,41.8,57.6,41.4,57.6,40.7z"/>
        </g>
        <g id="Layer_2">
        </g>
        </svg>`;
          }
          else if (id == 800){
            document.querySelector('.current-weather-image').innerHTML = document.querySelector('.current-weather-image').innerHTML +`
	<div>
            <svg version="1.1" class="clear-sky-svg" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" viewBox="0 0 72.3 92.6"
		 meet style="enable-background:new 0 0 512 512;" xml:space="preserve">
		<g>
			<path id="sunn" class="sun" fill="currentColor"
			fill="#FFF" d="M50.8,25.7c0,7.9-6.4,14.4-14.4,14.4s-14.4-6.4-14.4-14.4s6.4-14.4,14.4-14.4S50.8,17.8,50.8,25.7z" />
			<path class="line big-path line-1" d="M54.5,25.8h6" />
			<path class="line big-path line-2" d="M12.4,25.8h6" />
			<path class="line big-path line-3" d="M36.5,44.3v6" />
			<path class="line big-path line-4" d="M36.5,8.2v-6" />
			<path class="line big-path line-5" d="M23,38.8l-4.8,4.8" />
			<path class="line big-path line-6" d="M54.9,8.9L50,13.8" />
			<path class="line big-path line-7" d="M50,38.8l4.4,4.4" />
			<path class="line big-path line-8" d="M18.8,9.6l4.2,4.2" />
		</g>
	</svg>
  </div>`
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
