
function citySearch(){
var city = document.getElementById("searchBox").value
 console.log(city)
 
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cea924180544dde5b612be105dafb515&units=imperial")

.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    // var locationIcon = document.querySelector('.weather-icon');
    // var {icon} = data.weather[0];
    // locationIcon.innerHTML = <img src="icons/${icon}.png">;
    var city = document.getElementById("city")
    city.textContent = data.name

    var temp = document.getElementById("tempNumbers")
    temp.textContent = data.main.temp

    var humid = document.getElementById("humNumbers")
    humid.textContent = data.main.humidity

    var wind = document.getElementById("windNumbers")
    wind.textContent = data.wind.speed

    // var uv = document.getElementById("uvNumbers")
    // uv.textContent = data.main.humidity


    get5DayForecast()

  });

} 

function get5DayForecast() {
    // another fetch
}


// new fetch put lat and long from other API into this one
fetch
https://api.openweathermap.org/data/2.5/onecall? + lat=33.441792&lon + =-94.037689&exclude=hourly,daily&appid={API key}