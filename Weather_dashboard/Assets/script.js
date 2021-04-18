
function citySearch(){
  var city = document.getElementById("searchBox").value
  const cityDisplay = document.getElementById("cityPlace")

  cityDisplay.textContent = city
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

        var date =document.getElementById("datePlace")
        date.innerHTML = dayjs.unix(dateTime).format("MMMM D, YYYY")

        var temp = document.getElementById("tempNumbers")
        temp.textContent = data.current.temp
    
        var humid = document.getElementById("humNumbers")
        humid.textContent = data.current.humidity
    
        var wind = document.getElementById("windNumbers")
        wind.textContent = data.current.wind_speed
    
        var uv = document.getElementById("uvNumbers")
        uv.textContent = data.current.uvi

        // console.log(data.daily[0])
        var forcastData = data.daily
        for (let i = 0; i < 5; i++) {
        var dailyDisplay = forcastData[i];
        const dateDaily = dailyDisplay.dt
        const dateDisplay = dayjs.unix(dateDaily).format("MMMM D, YYYY")
        const iconDaily = dailyDisplay.weather[0].icon
        
        const tempDaily = dailyDisplay.temp.day
        const humidDaily = dailyDisplay.humidity
     
        const iconPic = 'http://openweathermap.org/img/wn/' + iconDaily + '@2x.png'

        const dayForcast = document.createElement("div")
        const displayBox = document.getElementById("dailyPlace")
        dayForcast.setAttribute("class", "dayBox container row col align-self-start")
        dayForcast.innerHTML = dateDisplay + tempDaily + humidDaily 
     
        displayBox.appendChild(dayForcast)
        console.log(forcastData[i])
         }
      })
  
      get5DayForecast()
  
    });
  
  } 
  
  function get5DayForecast() {
      // another fetch
  }
  
  
  // new fetch put lat and long from other API into this one
  