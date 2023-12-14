$(document).ready(function() {
  $('#getWeatherBtn').on('click', function() {
    const city = $('#cityInput').val();
    const apiKey = '681ae4997cb7325aa81c08a906b01c36'; 

    if (city !== '') {
      const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const hourlyApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      // Fetch current weather
      $.ajax({
        url: currentApiUrl,
        method: 'GET',
        success: function(currentResponse) {
          displayCurrentWeather(currentResponse);
        },
        error: function(xhr, status, error) {
          $('#currentWeather').html('<p>Current weather not available</p>');
        }
      });

      // Fetch 3-hourly forecast
      $.ajax({
        url: hourlyApiUrl,
        method: 'GET',
        success: function(hourlyResponse) {
          displayHourlyForecast(hourlyResponse);
        },
        error: function(xhr, status, error) {
          $('#hourlyForecast').html('<p>Hourly forecast not available</p>');
        }
      });
    } else {
      $('#currentWeather').html('');
      $('#hourlyForecast').html('');
    }
  });
});

function displayCurrentWeather(currentResponse) {
  const temperature = currentResponse.main.temp;
  const weatherDesc = currentResponse.weather[0].description;
  const cityName = currentResponse.name;

  const currentWeatherInfo = `
    <div class="weather-card">
      <h3>${cityName}</h3>
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${weatherDesc}</p>
    </div>
  `;

  $('#currentWeather').html(currentWeatherInfo);
}

function displayHourlyForecast(hourlyResponse) {
  const weatherForecast = hourlyResponse.list.slice(0, 5); // Display the first 5 forecasts
  let weatherForecastInfo = '';

  weatherForecast.forEach(forecast => {
    const time = new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    const temperature = forecast.main.temp;
    const weatherDesc = forecast.weather[0].description;

    weatherForecastInfo += `
      <div class="weather-card">
        <h3>${time}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${weatherDesc}</p>
      </div>
    `;
  });

  $('#hourlyForcast').html(weatherForecastInfo); 
}
