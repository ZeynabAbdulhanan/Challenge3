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
  
    var titel = "<h3 style='font-size: 18px'>Current weather for " + response.name + " , " + response.sys.country + "</h3>"
    
    var icon = "<h4 style='padding-left: 10px'><img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png' style=' width: 40px; padding: 0px'>"

    var weather ="<h4 style='padding-left: 10px'>Weather: " + response.weather[0].main + "</h4>";
    
	var type = "<h4 style='padding-left: 10px'>"+ response.weather[0].description + "</h4>";

	var degC = "<h4 style='padding-left: 10px'>Temperature: " + Math.floor(response.main.temp - 273.15) + "&#176;C </h4>";

    var feelsLike = "<h4 style='padding-left: 10px'>Feel like: " + response.main.feels_like + "&deg;</h4>";
 
    var hum = "<h4 style='padding-left: 10px'>Humidity: " + response.main.humidity + "%</h4>";
    
    var wind = "<h4 style='padding-left: 10px'>Wind speed: " + response.wind.speed + "m/s</h4>";
    
	    
    // render weather in DOM
	var titelOf = document.getElementById('titel');
	       titelOf.innerHTML = titel; 
    
    var iconOf = document.getElementById('weatherIcon');
	       iconOf.innerHTML = icon;
    
    var weatherOf = document.getElementById('weather');
	       weatherOf.innerHTML = weather;
    
    var typeOf = document.getElementById('titel');
	       typeOf.innerHTML = type;
    
    var degCOf = document.getElementById('temp');
	       degCOf.innerHTML = degC;
    
     var feelsLikeOf = document.getElementById('feelsLike');
	       feelsLikeOf.innerHTML = feelsLike;
    
    var humOf = document.getElementById('hum');
	       humOf.innerHTML = hum;
    
    var windOf = document.getElementById('windSpeed');
	      windOf .innerHTML = wind;
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
        console.log(weather); 
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
		var date = formDate(dateTime);
		var time = formTime(dateTime); 
        //var icon = response.weather[0].icon; 
        //var weather = response.weather[0].main;
		var temp = 'Tempurate:' + Math.floor(forecastList[i].main.temp - 273.15);
        var hum = 'Humidity:' + forecastList[i].main.humidity;
        var feelsLike = 'Feels like:' + response.main.feels_like;
    
        
        text = '<div class="forecastDiv">';
        text +='<p class="date"> '+date+' </p>';
        text +='<p class="time"> '+time+' </p>';
        //text += '<p id="weatherIcon' +icon+'</p>';
        //text += '<p id="weather' +weather+'</p>';         
		text +='<p class="temp"> '+temp+'&#176;C </p>';
        text +='<p class="hum"> '+hum+' %</p>';
        text +='<p class="temp"> '+feelsLike+'&#176;C </p>';
		text +='</div>';
        

		forecastBox.innerHTML += text;     
	}

}
function formDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +' / '+ month;
}

function formTime(date) {
	var hours = date.getHours();
	if(hours<10){
		hours = '0'+hours;
	}
	var minutes = date.getMinutes();
	if(minutes < 10){
		minutes = '0'+ minutes;
	}
	return hours +':'+ minutes;
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
    
    
        sunRiseSet.innerHTML = text.data[0].sunrise + text.data[0].sunset;
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('getWeather').onclick = function(){
    getAPIdata();
    getHourlyForecast();
    showSunRiseSet();   
}