document.addEventListener("DOMContentLoaded", function () {
    const weather_button = document.querySelector('.weather');
    weather_button.addEventListener('click', function () {
      // alert("Click");
      if (geoWeatherMe.unit == "imperial") {
        geoWeatherMe.unit = "metric";
        geoWeatherMe();
      }
      else {
        geoWeatherMe.unit = "imperial";
        geoWeatherMe();
      }
    });
  });