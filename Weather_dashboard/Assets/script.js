// var recentCity = document.createElement("p");

// var userCity = document.getElementById("searchBox")

// if(localStorage.getItem("saved-cities")){
//   savedCities = JSON.parse(localStorage.getItem("saved-cities"))
// }

// var saveCities = document.getElementById("saveBtn")
// saveCities.addEventListener("click", saveCity);
// console.log(localStorage)
// var displayCities = function() {
  
  
// }





// function saveCity() {
//   var cityPlace = document.getElementById("city")
//   savedCities.push(userCity)
//   localStorage.setItem("saved-cities", JSON.stringify(savedCities));
  
//   var cities = localStorage.getItem("saved-cities")
// };






var searchedCity = document.getElementById("searchBox")
const saveButton = document.getElementById("saveBtn")
const recentCity = document.getElementById("searchPlace")

var savedCities = [];
saveButton.onclick = function() {
  const citySearched = searchedCity.value;
  
  if(citySearched){
    savedCities.push(citySearched)
    localStorage.setItem("city", JSON.stringify(savedCities));

    displayHistory()
    
  }

  var city = localStorage.getItem("city")
  citySearch(document.getElementById("searchBox").value)

}

  function displayHistory(){
    // var city = localStorage.getItem("city")
    if(localStorage.getItem("city")){

      savedCities = JSON.parse(localStorage.getItem("city"))

    }

    console.log('saved cites array!',savedCities)
    const searchDisplay = document.getElementById("searchPlace")
    searchDisplay.innerHTML = ""
    for (let i = 0; i < savedCities.length; i++) {

      var recentCity = document.createElement("li")
      recentCity.setAttribute("class", "history-city")

      recentCity.innerHTML = savedCities[i]

      searchDisplay.appendChild(recentCity)
      console.log(recentCity)
    }

  }
displayHistory()

// var pastCity = document.getElementsByClassName("history-city")
// pastCity.onclick = function () {
//   console.log("get clicked!")
// }
$(document).on('click', '.history-city', function() {
    console.log('we got clicked!!')
    citySearch($(this).text())
})


function citySearch(city){
  var city = city
  const cityDisplay = document.getElementById("cityPlace")

  cityDisplay.textContent = city
   
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cea924180544dde5b612be105dafb515&units=imperial")
  
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
 
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
    

        var date =document.getElementById("datePlace")
        date.innerHTML = dayjs.unix(dateTime).format("MMMM D, YYYY")

        var temp = document.getElementById("tempNumbers")
        temp.textContent = "Temp: " +  data.current.temp
    
        var humid = document.getElementById("humNumbers")
        humid.textContent = "Humid: " + data.current.humidity
    
        var wind = document.getElementById("windNumbers")
        wind.textContent = "Wind: " + data.current.wind_speed
    
        var uv = document.getElementById("uvNumbers")
        if(data.current.uvi <= 4){
          uv.setAttribute("class", "favorable")
        } else if(data.current.uvi > 4 && data.current.uvi <= 7){
          uv.setAttribute("class", "moderate")
        }else{
          uv.setAttribute("class", "severe")
        }
        uv.textContent = "UVI: " + data.current.uvi

        // console.log(data.daily[0])
        var forcastData = data.daily
        const displayBox = document.getElementById("dailyPlace")
        displayBox.innerHTML = ""
        for (let i = 0; i < 5; i++) {
        var dailyDisplay = forcastData[i];
        const dateDaily = dailyDisplay.dt
        const dateDisplay = dayjs.unix(dateDaily).format("MMMM D, YYYY")
        const iconDaily = dailyDisplay.weather[0].icon
        
        const tempDaily = dailyDisplay.temp.day
        const dailyTemp = document.createElement("p")
        dailyTemp.textContent = "Temp: " + tempDaily
        
        const humidDaily = dailyDisplay.humidity
        const dailyHumid = document.createElement("p")
        dailyHumid.textContent = "Humid: " + humidDaily

        const iconPic = 'http://openweathermap.org/img/wn/' + iconDaily + '@2x.png'
        const iconImg = document.createElement("img")
        iconImg.setAttribute("src", iconPic);
          

        const dailyDate = document.createElement("div")
       
        dailyDate.setAttribute("class", "dayBox col")
        dailyDate.innerHTML = dateDisplay 
     
        dailyDate.appendChild(iconImg)
        dailyDate.appendChild(dailyTemp)
        dailyDate.appendChild(dailyHumid)
        displayBox.appendChild(dailyDate)

        
        
         }
      })
  
      get5DayForecast()
  
    });
  
  } 
  
  function get5DayForecast() {
      // another fetch
  }
  
  
  // new fetch put lat and long from other API into this one
  