function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='671ed302134d547adf8e79c854664915';
	var city = document.getElementById('city').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
    //titel
    var titel = "<h3 style='font-size: 18px'>Current weather for " + response.name + " , " + response.sys.country + "</h3>"

    var weather = "<h4 style='padding-left: 10px'>Weather: " + response.weather[0].main + "</h4>";
	
    // get type of weather in string format with icon
	var type = "<h4 style='padding-left: 10px'>Description: <img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png' style=' width: 40px; padding: 0px'>"+ response.weather[0].description + "</h4>";

	// get temperature in Celcius
	var degC = "<h4 style='padding-left: 10px'>Temperature: " + Math.floor(response.main.temp - 273.15) + "&#176;C </h4>";
    
    //get feels like
    var feelsLike = "<h4 style='padding-left: 10px'>Feel like: " + response.main.feels_like + "&deg;</h4>";
    
	//get humidity
    var hum = "<h4 style='padding-left: 10px'>Humidity: " + response.main.humidity + "%</h4>";
    
    //get wind speed 
    var wind = "<h4 style='padding-left: 10px'>Wind speed: " + response.wind.speed + "m/s</h4>";
    
    // render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = titel + weather + type + degC  + feelsLike + hum + wind;
}

function onAPIError(error) {
    var weatherBox = document.getElementById('weather');
    var city = document.getElementById('city');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
    weatherBox.style.borderColor = "red";
    city.style.borderColor = "red";
}


////////////////////////////////////////////////////////forecast function///////////////////////////////////////////////////////////

function getHourlyForecast() {
	var url = 'https://api.openweathermap.org/data/2.5/forecast';
	var apiKey ='671ed302134d547adf8e79c854664915';
	var city = document.getElementById('city').value;;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get weather forecast
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		console.log(response);
		// render weatherCondition
		getForecast(response);
	})
	
	// catch error
	.catch(function (error) {

		console.error('Request failed', error);
	});
}

function getForecast(response) {

    var forecastBox = document.getElementById('forecast');
    var forecastList = response.list;
	
	for(var i=0; i< forecastList.length; i++){
     
        var dateTime = new Date(forecastList[i].dt_txt);
        var titel = ''; 
		var date = 'Date:' + dateTime.getDay() + '/' + dateTime.getMonth();
		var timeHour = 'Time:'+ dateTime.getHours(); 
        var timeMin = 'Time:' + dateTime.getMinutes();
		var temp = 'Tempurate:' + Math.floor(forecastList[i].main.temp - 273.15);
        var hum = 'Humidity:' + forecastList[i].main.humidity;
        
        //var weather = forecastList[i].weather[0].main
        
            //if (weather === "Rain") {
                //var icon = "<a>'<i class="fas fa-cloud-rain"></i>';
            //else if (weather === "Clouds") {
                //var icon = '<i class="fas fa-cloud"></i>';
            //} 
            //else if (weather === "Clear") {
                //var icon = '<i class="fas fa-cloud-sun"></i>';
            //}
            //else if (weather === "Snow") {
                //var icon = '<i class="far fa-snowflake"></i>';
            //}
        
        text = '<div class="forecastDiv">';
        text += '<p class="titelDiv"> '+titel+'</p>';
        //text += '<img class="weather' +weather+'>';         
        text +='<p class="date"> '+date+' </p>';
		text +='<p class="timeHour"> '+timeHour+'</p>'; text += '<p class="timeMin">'+timeMin+'</p>';
		text +='<p class="temp"> '+temp+'&#176;C </p>';
        text +='<p class="hum"> '+hum+' %</p>';
		text +='</div>';

		forecastBox.innerHTML += text;
	}

}

/////////////////////////////////////////////////////////sunrise/sunset/////////////////////////////////////////////////////////////

function showSunRiseSet(){
    
    var url = 'https://api.stormglass.io/v2/astronomy/point';
    var lat = '58.7984';
    var lng = '17.8081';   
	var apiKey ='dbcd824e-7b46-11ea-b83a-0242ac130002-dbcd8302-7b46-11ea-b83a-0242ac130002';
	var city = document.getElementById('city').value;
    
    var request = url + '?' + 'lat=' + '$' + lat + '&' +'lng=' + '$' + lng + 'appid=' + apiKey + '&' + 'q=' + city;
    
    fetch(request)
    
    .then((response) => response.json()).then((jsonData) => {
            sunRiseSetTimes(jsonData)
    });
    }


function sunRiseSetTimes(jsonData) {
    
    var sunBox = document.getElementById('sunRiseSet');   
    
    var text = {
        "data": [
        {
            "sunrise": "7:27:02 AM",
            "sunset": "5:05:55 PM",
            "time": "",
        
        },
        
        ],
            "meta": {
            "cost": 1,
            "dailyQuota": 50,
            "lat": 58.7984,
            "lng": 17.8081,
            "requestCount": 1,
        }
    }
    
    
        sunRiseSet.innerHTML = text.data.sunrise + text.data.sunset + text.data.lat + text.data.lng;
    
    
	//var weatherBox = document.getElementById('sunRiseSet');
	//weatherBox.innerHTML = sunrise + sunset;
}

//function showSunRiseSet(){
    //var text = '{"results":[' +
              // '{"sunrise":"7:27:02 AM","sunset":"5:05:55 PM" },' +
               //'{"sunrise":"7:27:05 AM","sunset":"5:05:55 PM" },' +
               //'{"firstName":"Peter","lastName":"Jones" }]}';

//obj = JSON.parse(text);
//document.getElementById("sunRiseSet").innerHTML =
//obj.results[1].sunrise + " " + obj.results[1].sunset;

//}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('getWeather').onclick = function(){
    getAPIdata();
    getHourlyForecast();
    showSunRiseSet();   
}