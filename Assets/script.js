
//this brings searchbox, save button,  into javascript
var searchedCity = document.getElementById("searchBox")
const saveButton = document.getElementById("saveBtn")

//this brings the place for the search history into javascript
const recentCity = document.getElementById("searchPlace")

//this array is where the cities get "stored"
var savedCities = [];

//click the button to start the function
saveButton.onclick = function() {

  //this variable brings in the stuff typed in the search city box
  const citySearched = searchedCity.value;
  

  //if there is something in the searchbox then...
  if(citySearched){

    //put the new thing into the savedCities array
    savedCities.push(citySearched)

    //sets the city from saved cities into local storage, must have 2 arguments first "argument" labels the info
    //sets the things in local storage as a string
    localStorage.setItem("city", JSON.stringify(savedCities));

    //fires off this function later
    displayHistory()
    
  }

  
  //this is a function, that fires off in line 75 with the value from the searchbox
  citySearch(document.getElementById("searchBox").value)

}

//function to display history
  function displayHistory(){
   //if there is stuff in local storage then...
    if(localStorage.getItem("city")){
//this unstringifies the stuff in local storage
      savedCities = JSON.parse(localStorage.getItem("city"))

    }

    //this variable gets things from the "search history" box
    const searchDisplay = document.getElementById("searchPlace")

    //this makes sure the box is empty first
    searchDisplay.innerHTML = ""

    //this says to do the next steps for all strings in savedCities array
    for (let i = 0; i < savedCities.length; i++) {

      //this is a variable that makes a list element 
      var recentCity = document.createElement("li")

      //this sets the "history-city" class to the list elements
      recentCity.setAttribute("class", "history-city")

      //this puts each string from the savedCities array as a list element
      recentCity.innerHTML = savedCities[i]

      //this sticks the list element on the page
      searchDisplay.appendChild(recentCity)
    
    }

  }
  //this fires off function
displayHistory()

//jquery this makes the whole page an event listenter, but only fires off the function when things with the
// "history-city" class get clicked
$(document).on('click', '.history-city', function() {
    //fires off citySearch function, "this" is the li that got clicked and text is the li text
    citySearch($(this).text())
})

//we get the city from the clicked li on line 80
function citySearch(city){


  //this variable brings the place where the searched city gets displayed into javascript
  const cityDisplay = document.getElementById("cityPlace")

  //this tells the variable what text to display, the city that is typed in the searchbox
cityDisplay.textContent = city
 
   
  //this calls info from the api, it adds the typed city so thatis the info we get, then the api key, then putting the measurments into imperial
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cea924180544dde5b612be105dafb515&units=imperial")
  
  //return from api with information
  .then(function(response) {
    //turns raw response into json, just weather info
      return response.json();
    })



    //this makes respons.json an easier variable to use
    .then(function(data) {
 
      //get this stuff from response nested in the data
      const latitude = data.coord.lat 
      const longitude = data.coord.lon

      console.log(data)
      
      //this uses the latitude and longitude from the first fetch to get specific city info from this second api
      fetch( "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + 
      "&lon=" + longitude +
      "&exclude=hourly,minutely&appid=cea924180544dde5b612be105dafb515&units=imperial")


      .then(function(response) {
        return response.json();
      }) 
      .then(function(data) {
        
        //this gets the "date" from the api info
        const dateTime = data.current.dt
    
        //this is a place to display the date from the html
        var date =document.getElementById("datePlace")

        //format the date by using "dayjs"
        date.innerHTML = dayjs.unix(dateTime).format("MMMM D, YYYY")


        var temp = document.getElementById("tempNumbers")
        temp.textContent = "Temp: " +  data.current.temp
    
        var humid = document.getElementById("humNumbers")
        humid.textContent = "Humid: " + data.current.humidity
    
        var wind = document.getElementById("windNumbers")
        wind.textContent = "Wind: " + data.current.wind_speed
    

        var uv = document.getElementById("uvNumbers")
        //puts different classes on displayed UVI depending on the numbers
        if(data.current.uvi <= 4){
          uv.setAttribute("class", "favorable")
        } else if(data.current.uvi > 4 && data.current.uvi <= 7){
          uv.setAttribute("class", "moderate")
        }else{
          uv.setAttribute("class", "severe")
        }
        uv.textContent = "UVI: " + data.current.uvi

        // this is all for the 5 day forcast
        var forcastData = data.daily
        const displayBox = document.getElementById("dailyPlace")
        displayBox.innerHTML = ""
        
        //this loops through the first 5 days provided by api
        for (let i = 0; i < 5; i++) {
        var dailyDisplay = forcastData[i];
        const dateDaily = dailyDisplay.dt
        const dateDisplay = dayjs.unix(dateDaily).format("MMMM D, YYYY")

        //gets code for icon from api response
        const iconDaily = dailyDisplay.weather[0].icon
        
        const tempDaily = dailyDisplay.temp.day

        //p element may have nice text
        const dailyTemp = document.createElement("p")

        //"temp: +" is putting text on the page from the javascript
        dailyTemp.textContent = "Temp: " + tempDaily
        
        const humidDaily = dailyDisplay.humidity
        const dailyHumid = document.createElement("p")
        dailyHumid.textContent = "Humid: " + humidDaily

          // puts icon code into the URL to dinamically display the weather in icon form
        const iconPic = 'http://openweathermap.org/img/wn/' + iconDaily + '@2x.png'

        //variable to create icon image on the page
        const iconImg = document.createElement("img")

        //sets the atribut to the source from the iconPic variable
        iconImg.setAttribute("src", iconPic);
          

        const dailyDate = document.createElement("div")
       
        dailyDate.setAttribute("class", "dayBox row align-self-start")
        dailyDate.innerHTML = dateDisplay 
     
        //sticks each thing into a box for each day from the 5 day forcast from the api
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
    
  }
  
  
  
  