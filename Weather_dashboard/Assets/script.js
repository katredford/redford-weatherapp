
function citySearch(){
  var city = document.getElementById("searchBox").value
   console.log(city)
   
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cea924180544dde5b612be105dafb515&units=imperial")
  
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data.coord);
  
      // var locationIcon = document.querySelector('.weather-icon');
      // var {icon} = data.weather[0];
      // locationIcon.innerHTML = <img src="icons/${icon}.png">;
      // var city = document.getElementById("city")
      // city.textContent = data.name
  
      // var temp = document.getElementById("tempNumbers")
      // temp.textContent = data.main.temp
  
      // var humid = document.getElementById("humNumbers")
      // humid.textContent = data.main.humidity
  
      // var wind = document.getElementById("windNumbers")
      // wind.textContent = data.wind.speed
  
      // var uv = document.getElementById("uvNumbers")
      // uv.textContent = data.main.humidity
      const latitude = data.coord.lat
      const longitude = data.coord.lon
  
      fetch( "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + 
      "&lon=" + longitude +
      "&exclude=hourly,minutely&appid=cea924180544dde5b612be105dafb515&units=imperial")
      .then(function(response) {
        return response.json();
      }) 
      .then(function(data) {
        const dateTime = data.current.dt
        console.log(dayjs.unix(dateTime).format("MMMM D, YYYY"))
        console.log(data)
      })
  
      get5DayForecast()
  
    });
  
  } 
  
  function get5DayForecast() {
      // another fetch
  }
  
  
  // new fetch put lat and long from other API into this one
  